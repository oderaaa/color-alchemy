export interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: {
    email: string;
    password: string;
    username?: string;
  }) => Promise<void>;
  onToggleMode: () => void;
  isLoading?: boolean;
  error?: string | null;
}
