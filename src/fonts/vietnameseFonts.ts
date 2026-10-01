import {
  fontFamily as beVietnamProFamily,
  loadFont as loadBeVietnamPro,
} from "@remotion/google-fonts/BeVietnamPro";
import {
  fontFamily as bricolageGrotesqueFamily,
  loadFont as loadBricolageGrotesque,
} from "@remotion/google-fonts/BricolageGrotesque";
import {
  fontFamily as firaSansFamily,
  loadFont as loadFiraSans,
} from "@remotion/google-fonts/FiraSans";
import {
  fontFamily as interFamily,
  loadFont as loadInter,
} from "@remotion/google-fonts/Inter";
import {
  fontFamily as loraFamily,
  loadFont as loadLora,
} from "@remotion/google-fonts/Lora";
import {
  fontFamily as manropeFamily,
  loadFont as loadManrope,
} from "@remotion/google-fonts/Manrope";
import {
  fontFamily as merriweatherFamily,
  loadFont as loadMerriweather,
} from "@remotion/google-fonts/Merriweather";
import {
  fontFamily as notoSansFamily,
  loadFont as loadNotoSans,
} from "@remotion/google-fonts/NotoSans";
import {
  fontFamily as notoSerifFamily,
  loadFont as loadNotoSerif,
} from "@remotion/google-fonts/NotoSerif";
import {
  fontFamily as nunitoSansFamily,
  loadFont as loadNunitoSans,
} from "@remotion/google-fonts/NunitoSans";
import {
  fontFamily as playfairDisplayFamily,
  loadFont as loadPlayfairDisplay,
} from "@remotion/google-fonts/PlayfairDisplay";
import {
  fontFamily as robotoFamily,
  loadFont as loadRoboto,
} from "@remotion/google-fonts/Roboto";
import {
  fontFamily as sourceSans3Family,
  loadFont as loadSourceSans3,
} from "@remotion/google-fonts/SourceSans3";
import {
  fontFamily as sourceSerif4Family,
  loadFont as loadSourceSerif4,
} from "@remotion/google-fonts/SourceSerif4";

export type VietnameseFontWeight = "400" | "600" | "700";
export type VietnameseFontCategory = "sans" | "serif" | "display";

export interface VietnameseFontDefinition {
  key: string;
  family: string;
  category: VietnameseFontCategory;
  recommendedFor: string;
}

export const VIETNAMESE_FONT_CATALOG = [
  {
    key: "be-vietnam-pro",
    family: beVietnamProFamily,
    category: "sans",
    recommendedFor: "Font chủ đạo, phụ đề và giao diện tiếng Việt",
  },
  {
    key: "inter",
    family: interFamily,
    category: "sans",
    recommendedFor: "HUD, số liệu và phụ đề hiện đại",
  },
  {
    key: "roboto",
    family: robotoFamily,
    category: "sans",
    recommendedFor: "Nội dung dài và chữ nhỏ dễ đọc",
  },
  {
    key: "noto-sans",
    family: notoSansFamily,
    category: "sans",
    recommendedFor: "Tài liệu đa ngôn ngữ và lời dẫn",
  },
  {
    key: "fira-sans",
    family: firaSansFamily,
    category: "sans",
    recommendedFor: "Explainer, nhãn cảnh và infographic",
  },
  {
    key: "nunito-sans",
    family: nunitoSansFamily,
    category: "sans",
    recommendedFor: "Nội dung thân thiện, trẻ trung",
  },
  {
    key: "manrope",
    family: manropeFamily,
    category: "sans",
    recommendedFor: "Tiêu đề gọn, dashboard và công nghệ",
  },
  {
    key: "bricolage-grotesque",
    family: bricolageGrotesqueFamily,
    category: "display",
    recommendedFor: "Hook mạnh và tiêu đề giàu cá tính",
  },
  {
    key: "source-sans-3",
    family: sourceSans3Family,
    category: "sans",
    recommendedFor: "Phóng sự, editorial và chú thích",
  },
  {
    key: "noto-serif",
    family: notoSerifFamily,
    category: "serif",
    recommendedFor: "Lịch sử, trích dẫn và tư liệu",
  },
  {
    key: "merriweather",
    family: merriweatherFamily,
    category: "serif",
    recommendedFor: "Lời kể nghiêm túc và suy ngẫm",
  },
  {
    key: "lora",
    family: loraFamily,
    category: "serif",
    recommendedFor: "Trích dẫn, văn hóa và cảm xúc",
  },
  {
    key: "playfair-display",
    family: playfairDisplayFamily,
    category: "display",
    recommendedFor: "Tiêu đề điện ảnh và nhân vật lịch sử",
  },
  {
    key: "source-serif-4",
    family: sourceSerif4Family,
    category: "serif",
    recommendedFor: "Documentary dài và bố cục tạp chí",
  },
] as const satisfies readonly VietnameseFontDefinition[];

export type VietnameseFontKey = (typeof VIETNAMESE_FONT_CATALOG)[number]["key"];

export interface LoadVietnameseFontOptions {
  weights?: VietnameseFontWeight[];
  ignoreTooManyRequestsWarning?: boolean;
}

/**
 * Tải đúng một font cho composition đang dùng. Luôn kèm latin + vietnamese để
 * chữ thường, số và toàn bộ dấu tiếng Việt đều có glyph chính xác.
 */
export const loadVietnameseFont = (
  key: VietnameseFontKey,
  options: LoadVietnameseFontOptions = {},
) => {
  const weights = options.weights ?? ["400", "600", "700"];
  const loadOptions = {
    weights,
    subsets: ["latin", "vietnamese"] as Array<"latin" | "vietnamese">,
    ignoreTooManyRequestsWarning: options.ignoreTooManyRequestsWarning,
  };

  switch (key) {
    case "be-vietnam-pro":
      return loadBeVietnamPro("normal", loadOptions);
    case "inter":
      return loadInter("normal", loadOptions);
    case "roboto":
      return loadRoboto("normal", loadOptions);
    case "noto-sans":
      return loadNotoSans("normal", loadOptions);
    case "fira-sans":
      return loadFiraSans("normal", loadOptions);
    case "nunito-sans":
      return loadNunitoSans("normal", loadOptions);
    case "manrope":
      return loadManrope("normal", loadOptions);
    case "bricolage-grotesque":
      return loadBricolageGrotesque("normal", loadOptions);
    case "source-sans-3":
      return loadSourceSans3("normal", loadOptions);
    case "noto-serif":
      return loadNotoSerif("normal", loadOptions);
    case "merriweather":
      return loadMerriweather("normal", loadOptions);
    case "lora":
      return loadLora("normal", loadOptions);
    case "playfair-display":
      return loadPlayfairDisplay("normal", loadOptions);
    case "source-serif-4":
      return loadSourceSerif4("normal", loadOptions);
  }
};

export const getVietnameseFont = (key: VietnameseFontKey) =>
  VIETNAMESE_FONT_CATALOG.find((font) => font.key === key) ??
  VIETNAMESE_FONT_CATALOG[0];
