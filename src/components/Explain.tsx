import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

import { Icons } from "../assets/icons";

export default function Explain() {
  return (
    <div className="my-40 bg-secondary rounded-md p-10" id="how">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
        How it Works
      </h2>
      <div className="grid explain-card gap-6">
        <Card className="p-7 border">
          <CardHeader className="items-center p-2">
            <div className="w-12 rounded-sm border bg-secondary grid place-items-center h-12">
              <Icons.fileInput />
            </div>
            <CardTitle className="text-primary text-lg font-semibold lg:text-xl">
              Input File
            </CardTitle>
          </CardHeader>
          <CardDescription className="">
            You begin by Inputting the File You want to Encrypt. You will also
            be prompted to Use Generate A Private And Public Key
          </CardDescription>
        </Card>
        <Card className="p-7 border">
          <CardHeader className="items-center p-2">
            <div className="w-12 rounded-sm border bg-secondary grid place-items-center h-12">
              <Icons.binary />
            </div>
            <CardTitle className="text-primary text-lg font-semibold lg:text-xl">
              File Conversion
            </CardTitle>
          </CardHeader>
          <CardDescription className="">
            We Take the file you want to encrypt and converts it into a buffer
            array. a buffer array as a structured way to represent the file's
            data in a format that can be processed by the algorithm.
          </CardDescription>
        </Card>
        <Card className="p-7 border">
          <CardHeader className="items-center p-2">
            <div className="w-12 rounded-sm border bg-secondary grid place-items-center h-12">
              <Icons.fileLock />
            </div>
            <CardTitle className="text-primary text-lg font-semibold lg:text-xl">
              Hybrid Encryption
            </CardTitle>
          </CardHeader>
          <CardDescription className="">
            EncryptMe uses hybrid cryptography, which combines two encryption
            methods for added security.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
