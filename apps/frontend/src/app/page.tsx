"use client";
import AuthUser from "@/components/common/Auth/AuthUser";
import useLogin from "@/hooks/useLogin";
import Image from "next/image";

export default function Home() {
  const { is_logged_in } = useLogin();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="gap-8 md:gap-40 min-h-[448px] flex flex-col-reverse items-center md:justify-between lg:flex-row">
              <div className="flex flex-col justify-center space-y-4 max-w-[712px]">
                <div className="space-y-2">
                  <h1 className="text-center sm:text-left text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover the Latest Trends in the World of Blogging
                  </h1>
                  <p className="text-center sm:text-left max-w-[600px] text-muted-foreground md:text-xl">
                    Our blog covers a wide range of topics, from the latest
                    industry news to expert insights and practical tips.
                  </p>
                </div>
              </div>
              {is_logged_in ? (
                <Image
                  src="/images/summer_discover.svg"
                  width={480}
                  height={300}
                  className="rounded-lg"
                  alt="hero"
                />
              ) : (
                <AuthUser />
              )}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-24 muted-background rounded-2xl mb-8 px-10 mx-4">
          <div className="max-w-full mx-auto w-full">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Makes Our Blog Stand Out
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-base xl:text-xl leading-tight	">
                  Our blog offers a unique blend of informative content,
                  engaging storytelling, and a user-friendly experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/images/bulb.svg"
                    width={128}
                    height={128}
                    alt=""
                  />
                  <h3 className="text-xl font-bold">Engaging Content</h3>
                </div>
                <p className="text-muted-foreground">
                  Our blog features well-researched and thought-provoking
                  articles that keep our readers engaged and informed.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/images/hifive.svg"
                    width={128}
                    height={128}
                    alt=""
                  />
                  <h3 className="text-xl font-bold">Diverse Topics</h3>
                </div>
                <p className="text-muted-foreground">
                  From industry trends to personal development, our blog covers
                  a wide range of topics to cater to diverse interests.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/images/airplane.svg"
                    width={128}
                    height={128}
                    alt=""
                  />
                  <h3 className="text-xl font-bold">User-Friendly Design</h3>
                </div>
                <p className="text-muted-foreground">
                  Our blog's clean and intuitive design makes it easy for
                  readers to navigate and find the content they're looking for.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
