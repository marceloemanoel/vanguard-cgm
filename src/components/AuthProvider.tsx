import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";

export const AuthSchema = z.object({
  url: z.string().url(),
  apiToken: z.string().optional(),
});

type AuthContext = z.infer<typeof AuthSchema>;

type AuthProviderState = {
  authContext?: AuthContext;
  setAuthContext(ctx: AuthContext): void;
};

const initialState: AuthProviderState = {
  authContext: undefined,
  setAuthContext: () => {},
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

type AuthProviderProps = {
  defaultAuth?: AuthContext;
  storageKey?: string;
};

export function AuthProvider({
  defaultAuth,
  children,
}: PropsWithChildren<AuthProviderProps>) {
  const [authContext, setAuthContext] = useState<AuthContext | undefined>(
    defaultAuth,
  );

  useEffect(() => {
    console.log(authContext);
  }, [authContext]);

  const value = {
    authContext,
    setAuthContext,
  };

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthProviderContext);

  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");

  return context;
};
