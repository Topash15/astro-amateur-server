export class photo {
  source: string;
  description: string;

  constructor(source: string, description: string) {
    this.source = source;
    this.description = description;
  }
}

export class link {
  source: string;
  title?: string;

  constructor(source: string, title?: string) {
    this.source = source;
    this.title = title;
  }
}

export class LearningContentObject {
  id: number;
  date: Date;
  title: string;
  summary: string;
  body: string;
  body2?: string;
  body3?: string;
  articles?: link[];
  photos?: photo[];

  constructor(
    id: number,
    date: Date,
    title: string,
    summary: string,
    body: string,
    body2?: string,
    body3?: string,
    articles?: link[],
    photos?: photo[]
  ) {
    this.id = id;
    this.date = new Date(date);
    this.title = title;
    this.summary = summary;
    this.body = body;
    this.body2 = body2;
    this.body3 = body3;
    this.articles = articles;
    this.photos = photos;
  }
}

export const learningContent: LearningContentObject[] = [
  {
    id: 1,
    date: new Date(2022, 6, 12),
    title: 'Editing Moon Photos',
    summary:
      'Some simple tips to edit your photos of the moon and take them to the next level.',
    body: 'This article gives a great guide to make your moon photos pop. It focuses on using Lightroom, but I was able to follow along with a free alternative, RawTherapee. The main points that I took out of the article are as follows. Set the white balance using a dropper tool. For RawTherapee, this tool is next to the hand towards the top right. You want to click your dropper within the lunar seas. Then, overexpose in your editor. The goal is to almost completely white, but you should still be able to make out the lunar seas. Then, decrease the contrast. This is where the detail pops out at you. At this point, you can also play around with the black levels to get additional detail. Finally add some saturation to make those lunar seas pop. The seas do have a slight blue tinge that you can bring out with some saturation. Go ahead and crop, then add your photo to the queue because you are done!',
    articles: [
      {
        title: "Lightroom Editing Tips for Awesome Moon Photos",
        source:
          'https://digital-photography-school.com/lightroom-moon-editing-tips-for-awesome-moon-photos/',
      },
    ],
    photos: [
      {
        source: '../../assets/images/before-after.webp',
        description: 'Example of before and after using this editing technique',
      },
    ],
  },
  {
    id: 2,
    date: new Date(2022, 6, 14),
    title: 'A Quick Review of My Gear',
    summary: "What I like and what I don't like about the gear that I have.",
    body: "Sticking with a budget means that I get to try some cheap gear. A positive of this is that I can tell you what's worth buying and what to skip. Starting with the camera, the Canon 550D (aka Rebel T2i) has treated me very well. I was able to purchase it for under $200 with 2 lenses on the used marketplace. It has an 18mp sensor which is plenty for detailed photos of the moon and rockets. It is nothing special when it comes to video or luxury features like wifi/bluetooth, but it certainly gets the job done. I'd certainly recommend it for beginners.",
    body2:
      "The 55-250mm lens that came with the camera is the bare minimum that I would use for the Moon. The included stabilization support can help get a good shot freehand though I would definitely suggest leaning the camera against something solid at the minimum. The Opteka 500mm Telephoto lens has been my personal favorite, but it takes some work to control. Be warned for it is heavy and fully manual. They go around $100 new and less than that on the used market. They don't compare to big brand 500mm lens but for a beginner, this lens can really bring your subject much closer and give you some great shots. My best shots have been with this lens. You can also purchase (or it may come with the lens) a 2.0x teleconverter. Some people love them and some are against these, but it essentially turns your 500mm lens into a 1000mm one at the cost of your aperature. For a bright target like the Moon, the aperature doesn't affect your photo too much and you're able to get much better focus and detail. My last lens, a Canon 35-85mm Zoom, has not been used much as it simply doesn't have the reach of my other ones. Once I start taking photos of the entire starry sky, I do expect to use that lens however.",
    body3:
      "This last part will be dedicated to the gear that I would probably reconsider. My generic Ebay-special intervalometer is used to take photos without touching my camera. It allows me to take hundreds of photos at a time if I program it to. Once issue I've found is that it is unable to take multiple photos if the shutter/interval is set to low. I'm not 100% sure if this is a limitation of the tool or the camera, but I'm leaning towards the gear because the camera can do successive shots manually without issue. That said, it doesn't usually affect me so I'm okay with it for now. My current tripod can be considered 'okay-at-best'. The Vivitar VPT-2400 cannot handle the weight of the Opteka lens. The head drifts and is very difficult to aim properly. It can be made to work, but I only use it because it was a $10 Goodwill find and I haven't found better yet. If you plan on using a smaller lense like the 55-250mm, it does handle that weight much better. Before the Vivitar, I used an Amazon Basics lightweight tripod which is more of the same. It can handle the stock lenses, but the Opteka is completely unusable with it. The final peice of gear (or two I suppose) that I absolutely would not recommend is the Commander Pro HD Series wide angle lens and 2.2x Telephoto lens attachments. They came together for $10 and, quite frankly, they aren't even worth that. The image quality is distorted and cloudy. Just don't bother.",
    articles: [
      {
        source: "https://www.canon.co.uk/for_home/product_finder/cameras/digital_slr/eos_550d/",
        title: "Spec sheet for the Canon 550D. You'll have to purchase secondhand."
      },
      {
        source:
          'https://smile.amazon.com/Opteka-1000mm-Telephoto-Digital-Cameras/dp/B074QVXXTF/ref=sr_1_1?keywords=opteka+500mm&qid=1657841873&sprefix=opteka+500mm%2Caps%2C91&sr=8-1',
        title: 'Opteka 500mm with attachable 2.0x teleconverter and a Canon mount',
      },
      {
        source:
          'https://www.ebay.com/itm/363279698003?_trkparms=amclksrc%3DITM%26aid%3D111001%26algo%3DREC.SEED%26ao%3D1%26asc%3D20160908105057%26meid%3D6b72e8b17095410c8a99715a5e06812d%26pid%3D100675%26rk%3D2%26rkt%3D15%26sd%3D373849318437%26itm%3D363279698003%26pmt%3D0%26noa%3D1%26pg%3D2380057%26brand%3DUnbranded&_trksid=p2380057.c100675.m4236&_trkparms=pageci%3A53abfd79-03ce-11ed-8b2a-825ac7fa8724%7Cparentrq%3Aff15b6431810a45ea8e35668fff1a27a%7Ciid%3A1',
        title: "The generic intervalometer. It's cheap and works for most situations that I need from it.",
      },
      {
        source: "https://smile.amazon.com/AmazonBasics-Lightweight-Camera-Mount-Tripod/dp/B00XI87KV8/ref=sr_1_4?crid=1VPFRAWREE7TW&keywords=amazon+basics+tripod&qid=1657842100&sprefix=amazon+basics+tripod%2Caps%2C87&sr=8-4",
        title: "Amazon Basics Tripod. Only get if you have a light camera or are on a super tight budget"
      }
    ],
    photos: [],
  },
];
