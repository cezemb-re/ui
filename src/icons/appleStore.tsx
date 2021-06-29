import { ReactElement } from 'react';

export interface Props {
  size?: number;
  color?: string;
  color2?: string;
  color3?: string;
}

export default function AppleStore({
  size = 20,
  color = '#fff',
  color2 = '#000',
  color3 = '#a6a6a6',
}: Props): ReactElement<SVGElement> {
  return (
    <svg viewBox="0 0 126.50751 40" width={size}>
      <title>Apple Store</title>
      <path
        fill={color3 as string}
        d="M116.97821,0H9.53468c-.3667,0-.729,0-1.09473.002-.30615.002-.60986.00781-.91895.0127A13.21476,13.21476,0,0,0,5.5171.19141a6.66509,6.66509,0,0,0-1.90088.627A6.43779,6.43779,0,0,0,1.99757,1.99707,6.25844,6.25844,0,0,0,.81935,3.61816a6.60119,6.60119,0,0,0-.625,1.90332,12.993,12.993,0,0,0-.1792,2.002C.00587,7.83008.00489,8.1377,0,8.44434V31.5586c.00489.3105.00587.6113.01515.9219a12.99232,12.99232,0,0,0,.1792,2.0019,6.58756,6.58756,0,0,0,.625,1.9043A6.20778,6.20778,0,0,0,1.99757,38.001a6.27445,6.27445,0,0,0,1.61865,1.1787,6.70082,6.70082,0,0,0,1.90088.6308,13.45514,13.45514,0,0,0,2.0039.1768c.30909.0068.6128.0107.91895.0107C8.80567,40,9.168,40,9.53468,40H116.97821c.3594,0,.7246,0,1.084-.002.3047,0,.6172-.0039.9219-.0107a13.279,13.279,0,0,0,2-.1768,6.80432,6.80432,0,0,0,1.9082-.6308,6.27742,6.27742,0,0,0,1.6172-1.1787,6.39482,6.39482,0,0,0,1.1816-1.6143,6.60413,6.60413,0,0,0,.6191-1.9043,13.50641,13.50641,0,0,0,.1856-2.0019c.0039-.3106.0039-.6114.0039-.9219.0078-.3633.0078-.7246.0078-1.0938V9.53613c0-.36621,0-.72949-.0078-1.09179,0-.30664,0-.61426-.0039-.9209a13.50709,13.50709,0,0,0-.1856-2.002,6.6177,6.6177,0,0,0-.6191-1.90332,6.46619,6.46619,0,0,0-2.7988-2.7998,6.76753,6.76753,0,0,0-1.9082-.627,13.04394,13.04394,0,0,0-2-.17676c-.3047-.00488-.6172-.01074-.9219-.01269-.3594-.002-.7246-.002-1.084-.002Z"
      />
      <path
        fill={color2 as string}
        d="M8.44482,39.125c-.30467,0-.602-.0039-.90428-.0107a12.68714,12.68714,0,0,1-1.86914-.1631,5.88381,5.88381,0,0,1-1.65674-.5479,5.40573,5.40573,0,0,1-1.397-1.0166,5.32082,5.32082,0,0,1-1.02051-1.3965,5.72186,5.72186,0,0,1-.543-1.6572,12.41351,12.41351,0,0,1-.1665-1.875c-.00634-.2109-.01464-.9131-.01464-.9131V8.44434S.88185,7.75293.8877,7.5498a12.37138,12.37138,0,0,1,.16552-1.87207,5.75577,5.75577,0,0,1,.54347-1.6621A5.37365,5.37365,0,0,1,2.61182,2.61768,5.56562,5.56562,0,0,1,4.01417,1.59521a5.82309,5.82309,0,0,1,1.65332-.54394A12.58579,12.58579,0,0,1,7.543.88721L8.44532.875h109.612l.9131.0127a12.38493,12.38493,0,0,1,1.8584.16259,5.93833,5.93833,0,0,1,1.6709.54785,5.59375,5.59375,0,0,1,2.415,2.41993,5.76267,5.76267,0,0,1,.5352,1.64892,12.995,12.995,0,0,1,.1738,1.88721c.0029.2832.0029.5874.0029.89014.0079.375.0079.73193.0079,1.09179V30.4648c0,.3633,0,.7178-.0079,1.0752,0,.3252,0,.6231-.0039.9297a12.73126,12.73126,0,0,1-.1709,1.8535,5.739,5.739,0,0,1-.54,1.67,5.48029,5.48029,0,0,1-1.0156,1.3857,5.4129,5.4129,0,0,1-1.3994,1.0225,5.86168,5.86168,0,0,1-1.668.5498,12.54218,12.54218,0,0,1-1.8692.1631c-.2929.0068-.5996.0107-.8974.0107l-1.084.002Z"
      />
      <path
        fill={color as string}
        d="M24.7718,20.30068a4.94881,4.94881,0,0,1,2.35656-4.15206,5.06566,5.06566,0,0,0-3.99116-2.15768c-1.67924-.17626-3.30719,1.00483-4.1629,1.00483-.87227,0-2.18977-.98733-3.6085-.95814a5.31529,5.31529,0,0,0-4.47292,2.72787c-1.934,3.34842-.49141,8.26947,1.3612,10.97608.9269,1.32535,2.01018,2.8058,3.42763,2.7533,1.38706-.05753,1.9051-.88448,3.5794-.88448,1.65876,0,2.14479.88448,3.591.8511,1.48838-.02416,2.42613-1.33124,3.32051-2.66914A10.962,10.962,0,0,0,27.691,24.69985,4.78205,4.78205,0,0,1,24.7718,20.30068Z"
      />
      <path
        fill={color as string}
        d="M22.04017,12.21089a4.87248,4.87248,0,0,0,1.11452-3.49062,4.95746,4.95746,0,0,0-3.20758,1.65961,4.63634,4.63634,0,0,0-1.14371,3.36139A4.09905,4.09905,0,0,0,22.04017,12.21089Z"
      />
      <path
        fill={color as string}
        d="M35.65528,14.70166V9.57813h-1.877V8.73486h4.67676v.84326H36.582v5.12354Z"
      />
      <path
        fill={color as string}
        d="M42.76466,13.48584a1.828,1.828,0,0,1-1.95117,1.30273,2.04531,2.04531,0,0,1-2.08008-2.32422,2.07685,2.07685,0,0,1,2.07617-2.35254c1.25293,0,2.00879.856,2.00879,2.27v.31006H39.63868v.0498a1.1902,1.1902,0,0,0,1.19922,1.29,1.07934,1.07934,0,0,0,1.07129-.5459Zm-3.126-1.45117H41.9131a1.08647,1.08647,0,0,0-1.1084-1.1665A1.15162,1.15162,0,0,0,39.63868,12.03467ZM40.2754,9.4458l1.03809-1.42236h1.042L41.19337,9.4458Z"
      />
      <path
        fill={color as string}
        d="M44.05274,8.44092h.88867v6.26074h-.88867Z"
      />
      <path
        fill={color as string}
        d="M50.208,13.48584a1.828,1.828,0,0,1-1.95117,1.30273,2.04531,2.04531,0,0,1-2.08008-2.32422,2.07685,2.07685,0,0,1,2.07617-2.35254c1.25293,0,2.00879.856,2.00879,2.27v.31006H47.082v.0498a1.1902,1.1902,0,0,0,1.19922,1.29,1.07934,1.07934,0,0,0,1.07129-.5459Zm-3.126-1.45117h2.27441a1.08647,1.08647,0,0,0-1.1084-1.1665A1.15162,1.15162,0,0,0,47.082,12.03467Zm.63672-2.58887,1.03809-1.42236h1.042L48.63673,9.4458Z"
      />
      <path
        fill={color as string}
        d="M54.40333,11.67041a1.00546,1.00546,0,0,0-1.06348-.76465c-.74414,0-1.19922.57031-1.19922,1.52979,0,.97607.459,1.55908,1.19922,1.55908a.97873.97873,0,0,0,1.06348-.74023h.86426a1.762,1.762,0,0,1-1.92285,1.53418,2.06791,2.06791,0,0,1-2.11328-2.353,2.05305,2.05305,0,0,1,2.1084-2.32373,1.77731,1.77731,0,0,1,1.92773,1.55859Z"
      />
      <path
        fill={color as string}
        d="M56.44728,8.44092h.88086v2.48145h.07031a1.3856,1.3856,0,0,1,1.373-.80664,1.48339,1.48339,0,0,1,1.55078,1.67871v2.90723h-.88965v-2.688c0-.71924-.335-1.0835-.96289-1.0835a1.05194,1.05194,0,0,0-1.13379,1.1416v2.62988h-.88867Z"
      />
      <path
        fill={color as string}
        d="M61.43946,13.42822c0-.81055.60352-1.27783,1.6748-1.34424l1.21973-.07031V11.625c0-.47559-.31445-.74414-.92188-.74414-.49609,0-.83984.18213-.93848.50049h-.86035c.09082-.77344.81836-1.26953,1.83984-1.26953,1.12891,0,1.76514.562,1.76514,1.51318v3.07666h-.855v-.63281H64.293a1.515,1.515,0,0,1-1.35254.707A1.36026,1.36026,0,0,1,61.43946,13.42822Zm2.89453-.38477V12.667l-1.09961.07031c-.62012.0415-.90137.25244-.90137.64941,0,.40527.35156.64111.835.64111A1.0615,1.0615,0,0,0,64.334,13.04346Z"
      />
      <path
        fill={color as string}
        d="M66.60987,10.19873h.85547v.69043h.06641a1.22092,1.22092,0,0,1,1.21582-.76514,1.86836,1.86836,0,0,1,.39648.03711v.877a2.43442,2.43442,0,0,0-.49609-.05371A1.05507,1.05507,0,0,0,67.49855,12.043v2.65869h-.88867Z"
      />
      <path
        fill={color as string}
        d="M69.96144,15.15234h.90918c.0752.32666.45117.5376,1.05078.5376.74023,0,1.17871-.35156,1.17871-.94678v-.86426H73.0337a1.51433,1.51433,0,0,1-1.38965.75635c-1.14941,0-1.86035-.88867-1.86035-2.23682,0-1.373.71875-2.27441,1.86914-2.27441a1.56045,1.56045,0,0,1,1.41406.79395h.07031v-.71924h.85156v4.54c0,1.02979-.80664,1.68311-2.08008,1.68311C70.7837,16.42188,70.05616,15.91748,69.96144,15.15234Zm3.15527-2.7583c0-.897-.46387-1.47168-1.2207-1.47168-.76465,0-1.19434.57471-1.19434,1.47168,0,.89746.42969,1.47217,1.19434,1.47217C72.65773,13.86621,73.11671,13.2959,73.11671,12.394Z"
      />
      <path
        fill={color as string}
        d="M79.21241,13.48584a1.828,1.828,0,0,1-1.95117,1.30273,2.04531,2.04531,0,0,1-2.08008-2.32422,2.07685,2.07685,0,0,1,2.07617-2.35254c1.25293,0,2.00879.856,2.00879,2.27v.31006H76.08644v.0498a1.1902,1.1902,0,0,0,1.19922,1.29,1.07934,1.07934,0,0,0,1.07129-.5459Zm-3.126-1.45117h2.27441a1.08647,1.08647,0,0,0-1.1084-1.1665A1.15162,1.15162,0,0,0,76.08644,12.03467Z"
      />
      <path
        fill={color as string}
        d="M80.45948,10.19873H81.315v.69043h.06641a1.22092,1.22092,0,0,1,1.21582-.76514,1.86836,1.86836,0,0,1,.39648.03711v.877a2.43442,2.43442,0,0,0-.49609-.05371A1.05507,1.05507,0,0,0,81.34815,12.043v2.65869h-.88867Z"
      />
      <path
        fill={color as string}
        d="M86.19581,12.44824c0-1.42285.73145-2.32422,1.86914-2.32422a1.484,1.484,0,0,1,1.38086.79h.06641V8.44092h.88867v6.26074h-.85156v-.71143H89.479a1.56284,1.56284,0,0,1-1.41406.78564C86.91944,14.77588,86.19581,13.87451,86.19581,12.44824Zm.918,0c0,.95508.4502,1.52979,1.20313,1.52979.749,0,1.21191-.583,1.21191-1.52588,0-.93848-.46777-1.52979-1.21191-1.52979C87.56886,10.92236,87.11378,11.501,87.11378,12.44824Z"
      />
      <path
        fill={color as string}
        d="M91.60206,13.42822c0-.81055.60352-1.27783,1.6748-1.34424l1.21973-.07031V11.625c0-.47559-.31445-.74414-.92187-.74414-.49609,0-.83984.18213-.93848.50049h-.86035c.09082-.77344.81836-1.26953,1.83984-1.26953,1.12891,0,1.76563.562,1.76563,1.51318v3.07666h-.85547v-.63281h-.07031a1.515,1.515,0,0,1-1.35254.707A1.36026,1.36026,0,0,1,91.60206,13.42822Zm2.89453-.38477V12.667L93.397,12.7373c-.62012.0415-.90137.25244-.90137.64941,0,.40527.35156.64111.835.64111A1.0615,1.0615,0,0,0,94.49659,13.04346Z"
      />
      <path
        fill={color as string}
        d="M96.773,10.19873h.85547v.71533h.06641a1.348,1.348,0,0,1,1.34375-.80225,1.46456,1.46456,0,0,1,1.55859,1.6748v2.915h-.88867V12.00977c0-.72363-.31445-1.0835-.97168-1.0835a1.03294,1.03294,0,0,0-1.0752,1.14111v2.63428H96.773Z"
      />
      <path
        fill={color as string}
        d="M103.61769,10.11182c1.0127,0,1.6748.47119,1.76172,1.26514h-.85254c-.082-.33057-.40527-.5415-.90918-.5415-.49609,0-.873.23535-.873.58691,0,.269.22754.43848.71582.55029l.748.17334c.85645.19873,1.25781.56689,1.25781,1.22852,0,.84766-.79,1.41406-1.86523,1.41406-1.07129,0-1.76953-.48389-1.84863-1.28174h.88965a.91365.91365,0,0,0,.97949.562c.55371,0,.94727-.248.94727-.60791,0-.26855-.21094-.44238-.66211-.5498l-.78516-.18213c-.85645-.20264-1.25293-.58691-1.25293-1.25684C101.86866,10.67383,102.60011,10.11182,103.61769,10.11182Z"
      />
      <path
        fill={color as string}
        d="M35.19825,18.06689h1.85938V30.48535H35.19825Z"
      />
      <path
        fill={color as string}
        d="M39.29786,22.61084l1.01563-4.54395h1.80664l-1.23047,4.54395Z"
      />
      <path
        fill={color as string}
        d="M49.14649,27.12891H44.4131l-1.13672,3.35645H41.27149l4.4834-12.41846h2.083l4.4834,12.41846H50.28224Zm-4.24316-1.54883h3.752l-1.84961-5.44775h-.05176Z"
      />
      <path
        fill={color as string}
        d="M62.00294,25.959c0,2.81348-1.50586,4.62109-3.77832,4.62109a3.0693,3.0693,0,0,1-2.84863-1.584h-.043v4.48438h-1.8584V21.43115h1.79883V22.937h.03418a3.21162,3.21162,0,0,1,2.88281-1.60059C60.48829,21.33643,62.00294,23.15283,62.00294,25.959Zm-1.91016,0c0-1.8335-.94727-3.03857-2.39258-3.03857-1.41992,0-2.375,1.23047-2.375,3.03857,0,1.82422.95508,3.0459,2.375,3.0459C59.14552,29.00488,60.09278,27.80859,60.09278,25.959Z"
      />
      <path
        fill={color as string}
        d="M71.9673,25.959c0,2.81348-1.50586,4.62109-3.77832,4.62109a3.0693,3.0693,0,0,1-2.84863-1.584h-.043v4.48438H63.43946V21.43115H65.2378V22.937H65.272a3.21162,3.21162,0,0,1,2.88281-1.60059C70.45265,21.33643,71.9673,23.15283,71.9673,25.959Zm-1.91016,0c0-1.8335-.94727-3.03857-2.39258-3.03857-1.41992,0-2.375,1.23047-2.375,3.03857,0,1.82422.95508,3.0459,2.375,3.0459C69.10987,29.00488,70.05714,27.80859,70.05714,25.959Z"
      />
      <path
        fill={color as string}
        d="M78.55323,27.02539c.1377,1.23145,1.334,2.04,2.96875,2.04,1.56641,0,2.69336-.80859,2.69336-1.91895,0-.96387-.67969-1.541-2.28906-1.93652l-1.60937-.38818C78.03663,24.271,76.978,23.20459,76.978,21.47412c0-2.14258,1.86719-3.61426,4.51855-3.61426,2.624,0,4.42285,1.47168,4.4834,3.61426H84.104c-.1123-1.23926-1.13672-1.9873-2.63379-1.9873s-2.52148.75684-2.52148,1.8584c0,.87793.6543,1.39453,2.25488,1.79l1.36816.33594c2.54785.60254,3.60645,1.62646,3.60645,3.44287,0,2.32324-1.85059,3.77832-4.79395,3.77832-2.75391,0-4.61328-1.4209-4.7334-3.667Z"
      />
      <path
        fill={color as string}
        d="M90.19,19.28857v2.14258h1.72168v1.47168H90.19v4.9917c0,.77539.34473,1.13672,1.10156,1.13672a5.80752,5.80752,0,0,0,.61133-.043v1.46289a5.10351,5.10351,0,0,1-1.03223.08594c-1.833,0-2.54785-.68848-2.54785-2.44434V22.90283H87.00636V21.43115h1.31641V19.28857Z"
      />
      <path
        fill={color as string}
        d="M92.90773,25.959c0-2.84912,1.67773-4.63916,4.29395-4.63916,2.625,0,4.29492,1.79,4.29492,4.63916,0,2.85645-1.66113,4.63867-4.29492,4.63867C94.56886,30.59766,92.90773,28.81543,92.90773,25.959Zm6.69531,0c0-1.95459-.89551-3.10791-2.40137-3.10791s-2.40039,1.16211-2.40039,3.10791c0,1.96191.89453,3.10645,2.40039,3.10645S99.603,27.9209,99.603,25.959Z"
      />
      <path
        fill={color as string}
        d="M103.02882,21.43115h1.77246v1.541h.043a2.1594,2.1594,0,0,1,2.17773-1.63574,2.86616,2.86616,0,0,1,.63672.06934V23.144a2.59794,2.59794,0,0,0-.835-.1123,1.8728,1.8728,0,0,0-1.93652,2.0835v5.37012h-1.8584Z"
      />
      <path
        fill={color as string}
        d="M116.22608,27.82617c-.25,1.64355-1.85059,2.77148-3.89844,2.77148-2.63379,0-4.26855-1.76465-4.26855-4.5957,0-2.84033,1.64355-4.68213,4.19043-4.68213,2.50488,0,4.08008,1.7207,4.08008,4.46631v.63672h-6.39453v.1123a2.358,2.358,0,0,0,2.43555,2.56445,2.04834,2.04834,0,0,0,2.09082-1.27344ZM109.94386,25.124h4.52637a2.17744,2.17744,0,0,0-2.2207-2.29834A2.29214,2.29214,0,0,0,109.94386,25.124Z"
      />
    </svg>
  );
}
