import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

// import { useSelector } from 'react-redux';
// import { useNavigate, useSearchParams } from 'react-router-dom';

interface GuestProps {
  children?: ReactNode;
}

export default function Guest({ children }: GuestProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

//   useEffect(() => {
//     if (isAuthenticated && !searchParams.has("token")) {
//       router.push("/");
//     }
//   }, [isAuthenticated, searchParams]);

  return <div>{children}</div>;
}
