import { Link } from "react-router-dom";
import { Button } from "../../@/components/ui/button";

export default function Intro() {
  return (
    <div className="my-40">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
        Secure<span className="text-primary">Cipher</span>
      </h1>
      <p className="mt-3">Keep your Files safe and secure With Peace of Mind</p>
      <div className="flex gap-7 items-center justify-center">
        <Link to={"/login"}>
          <Button variant="secondary" className="mt-10">
            Login
          </Button>
        </Link>
        <Link to={"/signup"}>
          <Button className="mt-10">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
