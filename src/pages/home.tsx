import frigeImage from "../images/fridge.jpg";
import ingredientsImage from "../images/ingredients.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] scroll-smooth">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empty The Fridge
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    What's in your fridge? Let's cook something delicious!
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Link
                    to="/list"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md border py-6 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="#info"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square h-[600px]"
                src={frigeImage}
              />
            </div>
          </div>
        </section>
        <section
          id="info"
          className="w-full py-12 md:py-24 lg:py-32 text-white bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
                </h2>
                <ul className="space-y-4">
                  <li className="space-y-1">
                    <span className="text-xl font-bold">Snap a Photo</span>
                    <p className="text-gray-500">
                      Take a quick snapshot of the contents of your fridge.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="text-xl font-bold">
                      Get Personalized Recipes
                    </span>
                    <p className="text-gray-500">
                      Our advanced AI algorithms analyze the ingredients in your
                      fridge and suggest mouthwatering recipes based on what you
                      have on hand.
                    </p>
                  </li>
                  <li className="space-y-1">
                    <span className="text-xl font-bold">
                      Cook with Confidence
                    </span>
                    <p className="text-gray-500">
                      Get easy-to-follow recipes tailored to your available
                      ingredients. No more food waste!
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                alt="Fridge"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src={ingredientsImage}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Empty The Fridge?
                </h2>
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Efficiency</h3>
                      <p className="text-gray-400">
                        Save time and money by cooking with what you already
                        have.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Reduce Food Waste</h3>
                      <p className="text-gray-400">
                        Say goodbye to forgotten ingredients and expired
                        produce.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Discover New Recipes
                      </h3>
                      <p className="text-gray-400">
                        Unlock a world of culinary possibilities with our
                        diverse recipe database.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
