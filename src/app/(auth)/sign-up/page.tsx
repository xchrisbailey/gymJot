import SignUpForm from "./signup_form";

export default function SignUpPage() {
  return (
    <div className="mx-auto w-full md:max-w-lg">
      <h1 className="mb-2 text-3xl font-bold">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
