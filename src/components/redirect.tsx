import { useEffect } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

type RedirectProps = {
  to: To;
  options?: NavigateOptions;
};

export default function Redirect({ to, options }: RedirectProps) {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(to, options);
  }, [navigate]);

  return null;
}
