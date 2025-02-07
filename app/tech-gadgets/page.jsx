import Gadget from "@/components/Gadget";

export default async function TechGadgets() {
  // Fetch data directly in the server component
  const response = await fetch(
    "https://fakestoreapi.com/products/category/electronics",
    { cache: "no-store" } // Ensures fresh data on each request
  );
  const gadgets = await response.json();

  return (
    <>
      <h1 className="font-headerBold text-[1.7rem] mb-10 ml-10">
        Latest in Tech
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-10 mb-8 mr-5 gap-10">
        {gadgets.map((gadget) => (
          <Gadget
            key={gadget.id}
            title={gadget.title}
            price={gadget.price}
            rating={gadget.rating.rate}
            image={gadget.image}
            count={gadget.rating.count}
          />
        ))}
      </div>
    </>
  );
}
