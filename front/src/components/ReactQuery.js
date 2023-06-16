// export async function fetchCoins() {
//   const response = await fetch("/room");
//   const data = await response.json();

//   return data;
// }
import { useQuery } from "react-query";

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("/room").then((res) => res.json()),
  });
  console.log(data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.address}</h1>
      <p>{data.price}</p>
    </div>
  );
}
export default Example;
