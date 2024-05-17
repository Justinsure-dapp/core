import { twMerge } from "tailwind-merge";

interface IconProps {
  icon: keyof typeof icons;
  className?: string;
  style?: React.CSSProperties;
  stroke?: string;
}

//Icons implementation by @marsian83 (https://github.com/marsian83)
export default function Icon(props: IconProps) {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        className={twMerge(
          "fill-current w-[1em] h-[1em]",
          props.className,
          props.stroke && "stroke-[0.83em] stroke-front text-transparent"
        )}
        style={{
          ...props.style,
          stroke: props.stroke,
        }}
      >
        {icons[props.icon]}
      </svg>
    </span>
  );
}

export type IconType = keyof typeof icons;

const icons = {
  dark_mode: (
    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
  ),
  light_mode: (
    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Zm297-297Z" />
  ),
  open_in_new: (
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
  ),
  close: (
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  ),
  expand_more: (
    <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
  ),
  bookmark: (
    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
  ),
  github: (
    <path d="M 476.32 -897.598 C 157.362 -897.598 -41.949 -552.334 117.549 -276.131 C 168.173 -188.429 249.208 -122.309 345.28 -90.244 C 365.994 -86.639 373.785 -99.068 373.785 -109.924 C 373.785 -119.782 373.244 -152.387 373.244 -187.104 C 269.177 -167.922 242.248 -212.459 233.962 -235.783 C 224.765 -258.444 210.182 -278.537 191.499 -294.278 C 176.997 -302.069 156.284 -321.208 190.961 -321.746 C 217.848 -318.803 241.628 -302.98 254.678 -279.281 C 278.497 -236.445 332.563 -221.158 375.315 -245.103 C 377.097 -266.149 386.501 -285.867 401.749 -300.492 C 309.568 -310.85 213.248 -346.603 213.248 -505.066 C 212.668 -546.246 227.831 -586.06 255.713 -616.383 C 243.036 -652.177 244.527 -691.451 259.854 -726.169 C 259.854 -726.169 294.528 -737.063 373.785 -683.705 C 441.561 -702.349 513.109 -702.349 580.925 -683.705 C 660.137 -737.561 694.852 -726.169 694.852 -726.169 C 710.182 -691.451 711.631 -652.177 698.996 -616.383 C 726.917 -586.143 742.122 -546.246 741.461 -505.066 C 741.461 -346.065 644.6 -310.85 552.422 -300.492 C 572.433 -280.235 582.623 -252.271 580.387 -223.852 C 580.387 -168.462 579.889 -123.925 579.889 -109.924 C 579.889 -99.068 587.637 -86.101 608.35 -90.244 C 910.776 -192.075 989.533 -583.075 750.159 -794.069 C 674.51 -860.729 577.156 -897.558 476.32 -897.598 Z" />
  ),
  arrow_forward: (
    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
  ),
  person: (
    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
  ),
  key: (
    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
  ),
  ssidChart: (
    <path d="M480-120 232-360l-112 80v-98l120-86 245 238 167-134h188v80H680L480-120Zm0-360L305-655 120-520v-99l193-141 175 175 352-255v99L480-480Z" />
  ),
  description: (
    <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
  ),
  logout: (
    <path d="M 200 -120 q -33 0 -56.5 -23.5 T 120 -200 v -560 q 0 -33 23.5 -56.5 T 200 -840 h 280 v 80 H 200 v 560 h 280 v 80 H 200 Z m 440 -160 l -55 -58 l 102 -102 H 360 v -80 h 327 L 585 -622 l 55 -58 l 200 200 l -200 200 Z" />
  ),
  passKey: (
    <path d="M120-160v-112q0-34 17.5-62.5T184-378q62-31 126-46.5T440-440q20 0 40 1.5t40 4.5q-4 58 21 109.5t73 84.5v80H120ZM760-40l-60-60v-186q-44-13-72-49.5T600-420q0-58 41-99t99-41q58 0 99 41t41 99q0 45-25.5 80T790-290l50 50-60 60 60 60-80 80ZM440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm300 80q17 0 28.5-11.5T780-440q0-17-11.5-28.5T740-480q-17 0-28.5 11.5T700-440q0 17 11.5 28.5T740-400Z" />
  ),
  safetyDivider: (
    <path d="M440-200v-560h80v560h-80ZM40-320v-23q0-24 13-44t36-30q26-11 53.5-17t57.5-6q30 0 57.5 6t53.5 17q23 10 36 30t13 44v23H40Zm560 0v-23q0-24 13-44t36-30q26-11 53.5-17t57.5-6q30 0 57.5 6t53.5 17q23 10 36 30t13 44v23H600ZM200-480q-33 0-56.5-23.5T120-560q0-33 23.5-56.5T200-640q33 0 56.5 23.5T280-560q0 33-23.5 56.5T200-480Zm560 0q-33 0-56.5-23.5T680-560q0-33 23.5-56.5T760-640q33 0 56.5 23.5T840-560q0 33-23.5 56.5T760-480Z" />
  ),
  paid: (
    <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
  ),
  receiptLong: (
    <path d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
  ),
  accountBalance: (
    <path d="M200-280v-280h80v280h-80Zm240 0v-280h80v280h-80ZM80-120v-80h800v80H80Zm600-160v-280h80v280h-80ZM80-640v-80l400-200 400 200v80H80Zm178-80h444-444Zm0 0h444L480-830 258-720Z" />
  ),
  analytics: (
    <path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
  ),
  check: <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />,
  done: <path d="M382-208 122-468l90-90 170 170 366-366 90 90-456 456Z" />,
  twitter: (
    <path d="M 627.013 376.092 L 924.197 37.802 L 853.798 37.802 L 595.645 331.475 L 389.611 37.802 L 151.917 37.802 L 463.548 481.929 L 151.917 836.635 L 222.315 836.635 L 494.756 526.44 L 712.39 836.635 L 950.085 836.635 M 247.722 89.789 L 355.876 89.789 L 853.746 787.203 L 745.567 787.203" />
  ),
  home: (
    <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
  ),
  grid: (
    <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520ZM200-600h160v-160H200v160Zm400 0h160v-160H600v160Zm0 400h160v-160H600v160Zm-400 0h160v-160H200v160Zm400-400Zm0 240Zm-240 0Zm0-240Z" />
  ),
  code: (
    <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
  ),
  filter: (
    <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
  ),
  back_ios_new: (
    <path
      d="M640-80 
    240-480l400-400 71 71-329 329 329 329-71 71Z"
    />
  ),
  accessibility: (
    <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520q-60-5-122-15t-118-25l20-80q78 21 166 30.5t174 9.5q86 0 174-9.5T820-720l20 80q-56 15-118 25t-122 15v520h-80v-240h-80v240h-80Z" />
  ),
  shield_person: (
    <path d="M480-450q-58 0-97.5-39.5T343-587q0-58 39.5-97.5T480-724q58 0 97.5 39.5T617-587q0 58-39.5 97.5T480-450Zm0-60q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0 429q-140-35-230-162.5T160-523v-238l320-120 320 120v238q0 152-90 279.5T480-81Zm0-399Zm0-337-260 98v196q0 63 17.5 120.5T287-296q46-25 93.5-37.5T480-346q52 0 99.5 12.5T673-296q32-49 49.5-106.5T740-523v-196l-260-98Zm0 531q-39 0-78 10t-77 30q32 35 71 61.5t84 41.5q45-15 84-41.5t71-61.5q-38-20-77-30t-78-10Z" />
  ),
  settings: (
    <path d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z" />
  ),
  edit: (
    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
  ),
  add: (
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
    />
  ),
  info: (
    <path
      d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"
    />
  ),
  menu: (
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
  )
} as const;
