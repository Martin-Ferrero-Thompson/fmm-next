
type ForbiddenPageContent = {
  title: string;
  message: string;
};

const content: ForbiddenPageContent = {
  title: "403",
  message: "You don’t have permission to access this page.",
};

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">{content.title}</h1>
        <p className="text-gray-700">{content.message}</p>
      </div>
    </div>
  );
}
