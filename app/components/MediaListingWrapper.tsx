export default function MediaListingWrapper({ 
  children,
  tableHeader,
}: {
  children: React.ReactNode,
  tableHeader: React.ReactNode,
}) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Listings</h1>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            {tableHeader}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </>
  );
}
