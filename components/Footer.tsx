export const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">
            © {new Date().getFullYear()} Pubudu Bandara. All rights reserved.
        </p>
      </div>
    </footer>
  );
};