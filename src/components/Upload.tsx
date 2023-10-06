import * as React from "react";

import { Card } from "../../@/components/ui/card";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import { Icons } from "../assets/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../@/components/ui/alert-dialog";
import axios from "axios";

import doc from "../assets/images/doc.png";
import fileImage from "../assets/images/file.png";
import pdf from "../assets/images/pdf.png";
import html from "../assets/images/html.png";
import jpg from "../assets/images/jpg.png";
import jsonFile from "../assets/images/json-file.png";
import mp4 from "../assets/images/mp4.png";
import png from "../assets/images/png.png";

interface userData {
  email: string;
}

export default function Upload({ userData }: { userData: userData }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [publicKey, setPublicKey] = React.useState<string>("");
  const [privateKey, setPrivateKey] = React.useState<string>("");
  const [randomKey, setRandomKey] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const fileTypeToIcon: object = {
    "application/pdf": pdf,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      doc,
    "application/msword": doc,
    "image/png": png,
    "image/jpeg": jpg,
    "application/json": jsonFile,
    "text/html": html,
    "video/mp4": mp4,
  };

  const formatFileSize = (size: number) => {
    if (size < 1000) return `${size} B`;
    if (size < 1000000) return `${(size / 1000).toFixed(2)} KB`;
    if (size <= 20000000) return `${(size / 1000000).toFixed(2)} MB`;
    return "File size is too large";
  };

  async function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    setFile(file);
  }

  const checkNulls = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file");
      setIsLoading(false);
      return;
    }

    if (!publicKey) {
      setError("Please generate public and private keys");
      setIsLoading(false);
      return;
    }

    setError("");
    setOpen(true);
  };

  async function onSubmit() {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("publicKey", publicKey);
    formData.append("privateKey", privateKey);
    formData.append("randomKey", randomKey);

    await axios
      .post(
        `http://localhost:5000/api/upload?user=${userData.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response: any) => {
        if (response.data.message === "File uploaded successfully") {
          setSuccess("File uploaded successfully");
        }

        setFile(null);
        setRandomKey("");
        setPublicKey("");
        setPrivateKey("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setTimeout(() => {
      setSuccess("");
    }, 3000);
    setIsLoading(false);
  }

  const generateKey = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setRandomKey(
      `${
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      }`
    );
  };

  const generatePublicandPrivateKeys = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!randomKey) {
      setError("Please enter a random key");
      return;
    }

    setIsGenerating(true);
    let { publicKey, privateKey } = await axios
      .post("http://localhost:5000/api/getKeys", {
        randomKey: randomKey,
      })
      .then((response: any) => {
        return response.data;
      });

    setPublicKey(publicKey);
    setPrivateKey(privateKey);

    setIsGenerating(false);
  };

  const downloadPrivateKey: any = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // Download text in private key as txt file
    if (!file) {
      setError("Please select a file");
      return;
    }
    const element = document.createElement("a");
    if (!privateKey) {
      setError("Please generate public and private keys");
      return;
    }
    setError("");
    const privateKeyFile = new Blob([privateKey], { type: "text/plain" });
    element.href = URL.createObjectURL(privateKeyFile);
    element.download = `${file?.name.split(".")[0]} Private Key.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    // Download random key as txt file
    const element2 = document.createElement("a");
    const randomKeyFile = new Blob([randomKey], { type: "text/plain" });
    element2.href = URL.createObjectURL(randomKeyFile);
    element2.download = `${file?.name.split(".")[0]} Password.txt`;
    document.body.appendChild(element2); // Required for this to work in FireFox
    element2.click();
  };

  return (
    <div>
      <Card className="auth-form mt-10">
        <div className={"grid gap-6"}>
          <form onSubmit={onSubmit} className="p-4 grid gap-2">
            {error && (
              <div className="text-destructive text-left text-sm">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-left text-sm">{success}</div>
            )}
            {!file && (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className="rounded-lg dotted-border cursor-pointer text-sm text-secondary p-16 select-none">
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    setFile(event.target.files![0]);
                  }}
                  ref={fileRef}
                />
                Click to browse or drag and drop your files
              </div>
            )}
            {file && (
              <div className="flex justify-between">
                <div className="text-sm text-left text-muted-foreground flex items-center justify-between w-[85%]">
                  <div>
                    <img
                      draggable={false}
                      src={
                        fileTypeToIcon[
                          file.type as keyof typeof fileTypeToIcon
                        ] || fileImage
                      }
                      className="h-6 w-6 inline-block mr-2"
                    />
                    {file.name.length > 10
                      ? file.name.substring(0, 10) + "..."
                      : file.name}
                  </div>
                  <span
                    className={`text-xs ${
                      file.size > 20000000
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}>
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() => {
                          setFile(null);
                        }}>
                        <Icons.delete className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Private Key</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            <div className="grid gap-1">
              <Label className="text-left block" htmlFor="email">
                Generate File Password
              </Label>
              <div className="flex justify-between">
                <Input
                  id="generateText"
                  placeholder="Generate File Password"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="w-[70%]"
                  value={randomKey}
                  onChange={(event) => setRandomKey(event.target.value)}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="grid place-items-center"
                        onClick={generatePublicandPrivateKeys}>
                        {isGenerating && (
                          <Icons.spinner className="h-4 w-4 animate-spin" />
                        )}
                        {!isGenerating && (
                          <Icons.checkcheck className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Use random key to generate public and private keys
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={generateKey}>
                        <Icons.refresh className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Generate Key</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="grid gap-1">
              <Label className="text-left" htmlFor="">
                Private Key{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground text-xs cursor-pointer pl-1">
                        ?
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Private key is used to decrypt the file (Download It).
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="flex justify-between">
                <Input
                  id="privatekey"
                  placeholder="Private Key"
                  disabled={true}
                  className="w-[85%]"
                  value={privateKey}
                  onChange={(event) => setPrivateKey(event.target.value)}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        onClick={downloadPrivateKey}>
                        <Icons.download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download Private Key</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="grid gap-1">
              <Label className="text-left" htmlFor="">
                Public Key{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground text-xs cursor-pointer pl-1">
                        ?
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      Public key is used to encrypt the file.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="flex justify-between">
                <Input
                  id="publickey"
                  placeholder="Public Key"
                  disabled={true}
                  value={publicKey}
                  onChange={(event) => setPublicKey(event.target.value)}
                />
              </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isLoading}
                  className="w-full"
                  onClick={(e) => {
                    checkNulls(e);
                  }}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Upload
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-destructive">
                    Have you downloaded and copied your keys?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Don't forget to downlaod your private key and copy your
                    random key. You will not be able to decrypt your file
                    without it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onSubmit}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </div>
      </Card>
    </div>
  );
}
