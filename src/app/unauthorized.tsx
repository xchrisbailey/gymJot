import SignInForm from './(auth)/sign-in/_components/signin_form';

export default function UnauthorizedPage() {
  return (
    <>
      <h1 className="mt-5 font-semibold text-rose-600">401 _ Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <SignInForm />
    </>
  );
}
