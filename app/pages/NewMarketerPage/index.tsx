import { useEffect, useState } from "react";
import DocTitle from "../../common/DocTitle";
import { twMerge } from "tailwind-merge";
import api from "../../utils/api";
import DataForm from "../../common/DataForm";
import { useAccount, useSignMessage } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function NewMarketerPage() {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");
  const { address } = useAccount();
  const navigate = useNavigate()

  const { signMessage, data: sign } = useSignMessage();
  const [data, setData] = useState<{
    name: string;
    imageUrl: string;
  }>({ name: "", imageUrl: "" });

  useEffect(() => {
    if (data && sign && address) {
      console.log("useEffect called");
      api.user
        .becomeMarketer(data, sign, address)
        .then((result) => {
          console.log(result);
          alert("You are now a marketer");
          navigate(0);
        })
        .catch((error) => {
          console.error(error);

          if (error.response?.data?.message) {
            alert(error.response.data.message);
          } else {
            alert("An error occured, please try again");
          }

          navigate("/dashboard");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sign]);

  return (
    <>
      <DocTitle title="Register to sell Policies" />

      <DataForm
        callback={async (formData) => {
          setLoading(true);

          try {
            if (address) {
              const nonce = await api.user.requestNonce(address);
              signMessage({
                message: `${JSON.stringify({
                  name: formData.name,
                  imageUrl: formData?.imageUrl || "",
                })}${nonce}`,
              });
              setData({
                name: formData.name,
                imageUrl: formData?.imageUrl || "",
              });
            }
          } catch (error) {
            setLoading(false);
            console.error(error);
            alert("An error occured, please try again");
          }
        }}
        className="flex flex-col gap-y-4 p-page"
      >
        <div className="flex mt-6 gap-x-16 mobile:gap-x-4">
          <div className="flex flex-col gap-y-6 basis-3/4">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-sm text-front/80">Marketing Name</h1>
              <input
                className="bg-background focus-within:outline-none px-3 py-3 border border-front/20 rounded-lg"
                placeholder="What name would you want to be known as"
                name="name"
                required
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <h1 className="text-sm text-front/80">Logo</h1>
              <input
                type="url"
                name="imageUrl"
                className="bg-background focus-within:outline-none px-3 py-3 border border-front/20 rounded-lg"
                placeholder="Provide logo url"
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>
          </div>
          <div
            className={twMerge(
              "bg-secondary/20 rounded-xl basis-1/4 flex items-center justify-center aspect-square mobile:basis-1/2",
              !logo && "animate-pulse",
            )}
          >
            <img
              src={logo}
              onError={(e) => {
                e.currentTarget.src = "";
                setLogo(e.currentTarget.src);
              }}
              draggable={false}
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="">
          <input
            type="submit"
            className="bg-secondary rounded-md py-2 px-6 cursor-pointer disabled:opacity-50 disabled:animate-pulse disabled:cursor-not-allowed"
            disabled={loading}
            value="Confirm"
          />
        </div>
      </DataForm>
    </>
  );
}
