export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams
  const lastName = sp?.lastname;
   const middlename = sp?.middlename;
  console.log("lastName-->", lastName);

  return (
    <h1 className="w-full h-full flex justify-center items-center">
      User ID: {id} {middlename} {lastName}
    </h1>
  );
}
