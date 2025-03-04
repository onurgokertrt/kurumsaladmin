"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NoauthLayout from "@/components/Layouts/NoauthLayout";
import router from "next/router";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sayfanın yenilenmesini önler
    setError(""); // Önceki hatayı temizle

    try {
      const cloudflareElement = document.getElementsByName(
        "cf-turnstile-response"
      )[0] as HTMLInputElement;
  
      const captchaToken = cloudflareElement?.value;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, captchaToken }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/dashboard')
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Giriş başarısız");
      }
    } catch (err) {
      console.error("API hatası:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_URL}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Sayfa kapatıldığında script'i kaldır
    };
  }, []);  

  return (
    <>
      <NoauthLayout>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="px-26 py-17.5 text-center">
                <Link className="mb-5.5 inline-block" href="/">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo/logo.png"}
                    alt="Logo"
                    width={176}
                    height={32}
                    priority />
                  <Image
                    className="dark:hidden"
                    src={"/images/logo/logo_dark.png"}
                    alt="Logo"
                    width={176}
                    height={32}
                    priority />
                </Link>
                <p className="2xl:px-20">
                  <i>Hem bellektir hem gelecek</i>
                </p>
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Kurumsal Portal Giriş
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Kullanıcı Adı
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        autoComplete="username"
                        placeholder="Kullanıcı adınızı giriniz."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Şifre
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Şifrenizi giriniz."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        autoComplete="current-password" />
                    </div>
                  </div>

                  {error && (
                    <p className="mb-4 text-red-500">
                      {error}
                    </p>
                  )}

                  <div
                    className="cf-turnstile justify-item text-center mb-3"
                    data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
                  ></div>

                  <div className="mb-5">
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      Giriş
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </NoauthLayout></>
  );
};

export default SignIn;
