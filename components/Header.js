import Image from 'next/image'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import Link from 'next/link'

export default function Header() {
const fs = useFlagship()

// Get flag 
const flagImageSrc = useFsFlag("flagImageSrc", "/coffee.jpg")
const flagBtnText = useFsFlag("flagBtnText", "Shop")
const flagIndustry = useFsFlag("flagIndustry", "Product")
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
const { hit: fsHit } = useFlagship()

return (
<header className="relative">
  <div className="absolute inset-x-0 bottom-0 h-1/2" />
    <div className="mx-auto">
      <div className="relative shadow-xl sm:overflow-hidden">
        <div className="absolute inset-0">
          <Image
            priority
            layout='fill'
            className="h-full w-full object-cover"
            src={flagImageSrc.getValue()}
            alt={flagIndustry.getValue()}
          />
          <div className="absolute inset-0 mix-blend-multiply" />
        </div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
        <p className="mx-auto max-w-xl text-center text-xl font-semibold uppercase tracking-wide text-white">
        {'The ' + flagIndustry.getValue() + ' House'}
        </p>
        <h1 className="mt-1 text-center font-semibold text-gray-900 text-4xl sm:text-5xl">
        <span className="block text-white">Life is better with</span>
        <span className="block" style={{color: flagBackgroundColor.getValue()}}>{flagIndustry.getValue()}</span>
        </h1>
        <div className="mt-10 flex justify-center">
          <Link href="/products">
            <button onClick={()=>{
                fsHit.send({
                  type: HitType.EVENT,
                  category: "Action Tracking",
                  action: "Click Discover",
                  label: "Engagement"
                })
              }}
              className="font-base flex items-center justify-center border border-transparent bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-100 sm:px-8" id="ab-btn">
              {flagBtnText.getValue()}
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</header>
)
}
