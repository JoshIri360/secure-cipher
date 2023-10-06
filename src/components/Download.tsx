import React from "react";

import { Button } from "../../@/components/ui/button";
import { Card } from "../../@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../@/components/ui/dialog";

import { Icons } from "../assets/icons";
import axios from "axios";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../@/components/ui/tooltip";

import fileImage from "../assets/images/file.png";

interface userData {
  email: string;
}

export default function Download({ userData }: { userData: userData }) {
  const [filesData, setFilesData] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(true);
  const [privateKey, setPrivateKey] = React.useState("");
  const [filePassword, setFilePassword] = React.useState("");
  const [privateKeyFile, setPrivateKeyFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/files?user=${userData.email}`
        );
        setFilesData(response.data.files);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [userData]);

  async function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const privateKeyFile = event.dataTransfer.files[0];
    console.log(privateKeyFile);
    setPrivateKeyFile(privateKeyFile);
  }

  const formatFileSize = (size: number) => {
    if (size < 1000) return `${size} B`;
    if (size < 1000000) return `${(size / 1000).toFixed(2)} KB`;
    if (size >= 1000000) return `${(size / 1000000).toFixed(2)} MB`;
  };

  function formatDateString(inputDateString: string) {
    // Create a Date object from the input string
    const date = new Date(inputDateString);

    // Define an array to map month numbers to month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract day, month, and year components from the date
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Create the formatted date string
    const formattedDateString = `${day}th ${month}, ${year}`;

    return formattedDateString;
  }

  function triggerDownload(fileName: string, filePassword: string) {
    const formData = new FormData();
    if (privateKeyFile !== null) {
      formData.append("file", privateKeyFile);
    }
    formData.append("filePassword", filePassword);
    formData.append("fileName", fileName);

    axios
      .post(
        `http://localhost:5000/api/download?user=${userData.email}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // to handle binary data
        }
      )
      .then((response) => {
        // Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/octet-stream",
        });

        // Build a URL from the file
        const fileURL = URL.createObjectURL(file);

        // Open the URL on a new Window
        const link = document.createElement("a");
        link.href = fileURL;

        link.setAttribute("download", fileName.split("/")[1]);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log("Error during file download: ", error);
      });
  }

  return (
    <Card className="text-right table my-10">
      <div className="flex items-center justify-center ">
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-20 h-20 my-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      {!loading && (
        <Table>
          <TableCaption>A list of your files.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead className="text-right">Size</TableHead>
              <TableHead className="text-right">Date Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filesData.map((file) => (
              <TableRow key={file.Key}>
                <TableCell className="font-medium text-left">
                  {file.Key.split("/")[1]}
                </TableCell>
                <TableCell>{formatFileSize(file.Size)}</TableCell>
                <TableCell>{formatDateString(file.LastModified)}</TableCell>
                <TableCell className="text-xl font-bold flex gap-2 justify-end">
                  <Button variant={"destructive"} className="p-2">
                    <Icons.delete />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"secondary"} className="p-2">
                        <Icons.download />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Enter Keys</DialogTitle>
                        <DialogDescription>
                          Enter your keys to decrypt the file.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="password" className="text-right">
                            File Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            className="col-span-3"
                            autoComplete="new-password" // Turn off autocomplete for password.
                            value={filePassword}
                            onChange={(e) => {
                              setFilePassword(e.target.value);
                            }}
                          />
                        </div>
                        {!privateKeyFile && (
                          <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileRef.current?.click()}
                            className="rounded-lg dotted-border cursor-pointer text-center text-sm text-secondary p-10 select-none">
                            <input
                              type="file"
                              hidden
                              onChange={(event) => {
                                setPrivateKeyFile(event.target.files![0]);
                              }}
                              ref={fileRef}
                            />
                            Drop your private key here or click to upload.
                          </div>
                        )}
                        {privateKeyFile && (
                          <div className="flex justify-between">
                            <div className="text-sm text-left text-muted-foreground flex items-center justify-between w-[85%]">
                              <div>
                                <img
                                  draggable={false}
                                  src={fileImage}
                                  className="h-6 w-6 inline-block mr-2"
                                />
                                {privateKeyFile.name.length > 10
                                  ? privateKeyFile.name.substring(0, 10) + "..."
                                  : privateKeyFile.name}
                              </div>
                              <span
                                className={`text-xs ${
                                  privateKeyFile.size > 20000000
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                                }`}>
                                {formatFileSize(privateKeyFile.size)}
                              </span>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant={"secondary"}
                                    size={"icon"}
                                    onClick={() => {
                                      setPrivateKeyFile(null);
                                    }}>
                                    <Icons.delete className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Download Private Key
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => {
                            triggerDownload(file.name, filePassword);
                          }}>
                          Submit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
