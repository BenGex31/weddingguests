import React from "react";
import Link from "@material-ui/core/Link";
import Input from "../components/Input";

const SignUp = () => {
  return (
    <div className='signUpContainerMain'>
      <div>
        <Input />
        <Link href='/'>Retour à la page connexion</Link>
      </div>
    </div>
  );
};

export default SignUp;
