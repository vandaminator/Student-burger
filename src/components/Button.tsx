type ButtonProps = { children: React.ReactNode; onClick?(): void };

const Button = (props: ButtonProps) => {
  return <button {...props} className="bg-accent p-2 rounded"/>;
};

export default Button;
