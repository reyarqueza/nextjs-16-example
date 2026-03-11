export default function MediaListingWrapper({ 
  children,
  tableHeader,
  isGrid = false,
  headerText = "Listing",
}: {
  children: React.ReactNode,
  tableHeader: React.ReactNode,
  isGrid?: boolean,
  headerText?: string,
}) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">{headerText}</h1>
      {isGrid ? (
        <div>
          <div className="grid grid-cols-3 border border-gray-200">{tableHeader}</div>
          {children}
        </div>
      ) : (
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
      )}
    </>
  );
}
