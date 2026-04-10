import { an, art, As, Doe, Fa, fit, get, Get, hit, IF, k4, Let, lit, m6, not, set, SF, sit, so, td, To, vs, yet } from "./chunk-005.js"
import { bg, eye, hUe, m4, Ma, of, one, Z0 } from "./chunk-001.js"
import { m9, On, OR, the } from "./chunk-015.js"
import { AI, are, n5, One, v4, zA } from "./chunk-002.js"
import { An, by, xt } from "../vendor/posthog/chunk-000.js"
import { as, BR, cx, cy, DO, due, em, FV, fx, id, If, Jwt, out, Qwt, rx, ry, The, x1, xl, y, y1, Za, Zwt } from "../index.js"
import { act, alt, bot, but, cut, dot, Dot, dx, m5, n1, use, Use } from "./chunk-006.js"
import { am, dA, g1, hue, js, kSt, mx, NO, OS, up, v3, w3 } from "./chunk-013.js"
import { dy, jx, Mi, n3, on, XX, YX } from "./chunk-004.js"
import { Gvt, In, M, M7, ql, see, WE, Z } from "./chunk-000.js"
import { fy, go, Pre, UI } from "./chunk-003.js"
import { M5, Vue, z_ } from "./chunk-014.js"
import { Do, k3, M9 } from "./chunk-016.js"
import { IS, px } from "../vendor/pixi/chunk-000.js"
import { sm, u1 } from "./chunk-017.js"
import { Fwt, l4e, nA, Owt } from "./chunk-011.js"
import { M4, Wgt, xs } from "./chunk-007.js"
import { Gg, k1, kbt, Kyt, rR, th, VK, zu } from "./chunk-009.js"
const jwt=`# .pen File Schema

\`\`\`typescript
/** Each key must be an existing theme axis, and each value must be one of the possible values for that axis. E.g. { 'device': 'phone' } */
export interface Theme {
  [key: string]: string;
}

/** To bind a variable to a property, set the property to the dollar-prefixed name of the variable! */
export type Variable = string;

export type NumberOrVariable = number | Variable;

/** Colors can be 8-digit RGBA hex strings (e.g. #AABBCCDD), 6-digit RGB hex strings (e.g. #AABBCC) or 3-digit RGB hex strings (e.g. #ABC which means #AABBCC). */
export type Color = string;

export type ColorOrVariable = Color | Variable;

export type BooleanOrVariable = boolean | Variable;

export type StringOrVariable = string | Variable;

export interface Layout {
  /** Enable flex layout. None means all children are absolutely positioned and will not be affected by layout properties. Frames default to horizontal, groups default to none. */
  layout?: "none" | "vertical" | "horizontal";
  /** The gap between children in the main axis direction. Defaults to 0. */
  gap?: NumberOrVariable;
  layoutIncludeStroke?: boolean;
  /** The Inside padding along the edge of the container */
  padding?:
    | /** The inside padding to all sides */ NumberOrVariable
    | /** The inside horizontal and vertical padding */ [
        NumberOrVariable,
        NumberOrVariable,
      ]
    | /** Top, Right, Bottom, Left padding */ [
        NumberOrVariable,
        NumberOrVariable,
        NumberOrVariable,
        NumberOrVariable,
      ];
  /** Control the justify alignment of the children along the main axis. Defaults to 'start'. */
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "space_between"
    | "space_around";
  /** Control the alignment of children along the cross axis. Defaults to 'start'. */
  alignItems?: "start" | "center" | "end";
}

/** SizingBehavior controls the dynamic layout size.
- fit_content: Use the combined size of all children for the container size. Fallback is used when there are no children.
- fill_container: Use the parent size for the container size. Fallback is used when the parent has no layout.
Optional number in parentheses (e.g., 'fit_content(100)') specifies the fallback size. */
export type SizingBehavior = string;

/** Position is relative to the parent object's position. X increases rightwards, Y increases downwards.
IMPORTANT: x and y are IGNORED when parent uses flexbox layout. */
export interface Position {
  x?: number;
  y?: number;
}

export interface Size {
  width?: NumberOrVariable | SizingBehavior;
  height?: NumberOrVariable | SizingBehavior;
}

export interface CanHaveRotation {
  /** Rotation is represented in degrees, measured counter-clockwise. */
  rotation?: NumberOrVariable;
}

export type BlendMode =
  | "normal"
  | "darken"
  | "multiply"
  | "linearBurn"
  | "colorBurn"
  | "light"
  | "screen"
  | "linearDodge"
  | "colorDodge"
  | "overlay"
  | "softLight"
  | "hardLight"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

export type Fill =
  | ColorOrVariable
  | {
      type: "color";
      enabled?: BooleanOrVariable;
      blendMode?: BlendMode;
      color: ColorOrVariable;
    }
  | {
      type: "gradient";
      enabled?: BooleanOrVariable;
      blendMode?: BlendMode;
      gradientType?: "linear" | "radial" | "angular";
      opacity?: NumberOrVariable;
      /** Normalized to bounding box (default: 0.5,0.5). */
      center?: Position;
      /** Normalized to bounding box (default: 1,1). Linear: height sets gradient length, width is ignored. Radial/Angular: sets ellipse diameters. */
      size?: { width?: NumberOrVariable; height?: NumberOrVariable };
      /** Rotation in degrees, counterclockwise (0° up, 90° left, 180° down). */
      rotation?: NumberOrVariable;
      colors?: { color: ColorOrVariable; position: NumberOrVariable }[];
    }
  /** Image fill. Url needs to be a relative from the pen file, for example \`../../file.png\` or \`./image.jpg\` */
  | {
      type: "image";
      enabled?: BooleanOrVariable;
      blendMode?: BlendMode;
      opacity?: NumberOrVariable;
      url: string;
      mode?: "stretch" | "fill" | "fit";
    }
  /** Grid of colors with bezier-interpolated edges. Row-major order. Adjust the points and handles to create complex gradients. Keep the points on the edges at their default position. */
  | {
      type: "mesh_gradient";
      enabled?: BooleanOrVariable;
      blendMode?: BlendMode;
      opacity?: NumberOrVariable;
      columns?: number;
      rows?: number;
      /** Color per vertex. */
      colors?: ColorOrVariable[];
      /** columns * rows points in [0,1] normalized coordinates. */
      points?: (
        | /** Position with auto-generated handles. */ [number, number]
        | /** Position with optional bezier handles (relative offsets). Omitted handles are auto-generated. */ {
            position: [number, number];
            leftHandle?: [number, number];
            rightHandle?: [number, number];
            topHandle?: [number, number];
            bottomHandle?: [number, number];
          }
      )[];
    };

export type Fills = Fill | Fill[];

export interface Stroke {
  align?: "inside" | "center" | "outside";
  thickness?:
    | NumberOrVariable
    | {
        top?: NumberOrVariable;
        right?: NumberOrVariable;
        bottom?: NumberOrVariable;
        left?: NumberOrVariable;
      };
  join?: "miter" | "bevel" | "round";
  miterAngle?: NumberOrVariable;
  cap?: "none" | "round" | "square";
  dashPattern?: number[];
  fill?: Fills;
}

export type Effect =
  /** 'blur' type blurs the entire layer content */
  | { enabled?: BooleanOrVariable; type: "blur"; radius?: NumberOrVariable }
  /** 'background_blur' type blurs the background content behind the layer */
  | {
      enabled?: BooleanOrVariable;
      type: "background_blur";
      radius?: NumberOrVariable;
    }
  /** The drop shadow effect can be an inner or outer shadow, with adjustable offset, spread, blur, color and blend mode. */
  | {
      type: "shadow";
      enabled?: BooleanOrVariable;
      shadowType?: "inner" | "outer";
      offset?: { x: NumberOrVariable; y: NumberOrVariable };
      spread?: NumberOrVariable;
      blur?: NumberOrVariable;
      color?: ColorOrVariable;
      blendMode?: BlendMode;
    };

export type Effects = Effect | Effect[];

export interface CanHaveGraphics {
  stroke?: Stroke;
  fill?: Fills;
  effect?: Effects;
}

export interface CanHaveEffects {
  effect?: Effects;
}

/** Entities have unique identifiers. */
export interface Entity extends Position, CanHaveRotation {
  /** A unique string that MUST NOT contain slash (/) characters. If omitted, a unique ID will be generated automatically. */
  id: string;
  /** Optional name for the entity, used for display and identification purposes */
  name?: string;
  /** Optional context information about this object. */
  context?: string;
  /** Objects are not reusable by default. If an object is made reusable by setting this property to \`true\`, the object can be duplicated using \`ref\` objects. */
  reusable?: boolean;
  theme?: Theme;
  enabled?: BooleanOrVariable;
  opacity?: NumberOrVariable;
  flipX?: BooleanOrVariable;
  flipY?: BooleanOrVariable;
  /** layoutPosition controls how a node is positioned within its parent. */
  layoutPosition?: "auto" | "absolute";
  metadata?: { type: string; [key: string]: any };
}

export interface Rectangleish extends Entity, Size, CanHaveGraphics {
  cornerRadius?:
    | NumberOrVariable
    | [NumberOrVariable, NumberOrVariable, NumberOrVariable, NumberOrVariable];
}

/** A rectangle is defined by its position and size. The position corresponds to the top-left corner. */
export interface Rectangle extends Rectangleish {
  type: "rectangle";
}

/** An ellipse is defined by its bounding rectangle's position and size. */
export interface Ellipse extends Entity, Size, CanHaveGraphics {
  type: "ellipse";
  /** Inner-to-outer radius ratio for ring shapes. 0 = solid, 1 = fully hollow. Default: 0. */
  innerRadius?: NumberOrVariable;
  /** Arc start angle in degrees, counter-clockwise from the right. Default: 0. */
  startAngle?: NumberOrVariable;
  /** Arc length in degrees from startAngle. Positive = counter-clockwise, negative = clockwise. Range: -360 to 360. Default: 360 (full ellipse). */
  sweepAngle?: NumberOrVariable;
}

/** A line is defined by its bounding rectangle's position and size. */
export interface Line extends Entity, Size, CanHaveGraphics {
  type: "line";
}

/** A regular polygon is defined by its bounding rectangle's position and size. */
export interface Polygon extends Entity, Size, CanHaveGraphics {
  type: "polygon";
  polygonCount?: NumberOrVariable;
  cornerRadius?: NumberOrVariable;
}

export interface Path extends Entity, Size, CanHaveGraphics {
  /** fillRule is used to determine which parts of the path are considered inside the shape to be filled. Default is 'nonzero'. */
  fillRule?: "nonzero" | "evenodd";
  /** SVG Path */
  geometry?: string;
  type: "path";
}

export interface TextStyle {
  fontFamily?: StringOrVariable;
  fontSize?: NumberOrVariable;
  fontWeight?: StringOrVariable;
  letterSpacing?: NumberOrVariable;
  fontStyle?: StringOrVariable;
  underline?: BooleanOrVariable;
  /** A multiplier that gets applied to the font size to determine spacing between lines. If not specified, uses the font's built-in line height. */
  lineHeight?: NumberOrVariable;
  textAlign?: "left" | "center" | "right" | "justify";
  textAlignVertical?: "top" | "middle" | "bottom";
  strikethrough?: BooleanOrVariable;
  href?: string;
}

export type TextContent = StringOrVariable | TextStyle[];

export interface Text extends Entity, Size, CanHaveGraphics, TextStyle {
  type: "text";
  content?: TextContent;
  /** textGrowth controls how the text box dimensions behave. It must be set before width or height can be used — without textGrowth, the width and height properties are ignored.
'auto': The text box automatically grows to fit the text content. Text does not wrap. Width and height adjust dynamically.
'fixed-width': The width is fixed and text wraps within it. The height grows automatically to fit the wrapped content.
'fixed-width-height': Both width and height are fixed. Text wraps and may be overflow if it exceeds the bounds.
IMPORTANT: Never set width or height without also setting textGrowth. If you want to control the size of a text box, you must set textGrowth first. */
  textGrowth?: "auto" | "fixed-width" | "fixed-width-height";
}

export interface CanHaveChildren {
  children?: Child[];
}

/** A frame is a rectangle that can have children. */
export interface Frame extends Rectangleish, CanHaveChildren, Layout {
  type: "frame";
  /** Visually clip content that overflows the frame bounds. Default is false. */
  clip?: BooleanOrVariable;
  placeholder?: boolean;
  /** If this property is set to an array, it indicates that this frame is a "slot" - which means that it is intended be customized with children in instances of the parent component. Each element of the array is an ID of a "recommended" reusable component, one which fits semantically as a child here (e.g. inside a menu bar, the content slot would recommend IDs of various menu item components). */
  slot?: false | string[];
}

export interface Group extends Entity, CanHaveChildren, CanHaveEffects, Layout {
  type: "group";
  width?: SizingBehavior;
  height?: SizingBehavior;
}

export interface Note extends Entity, Size, TextStyle {
  type: "note";
  content?: TextContent;
}

export interface Prompt extends Entity, Size, TextStyle {
  type: "prompt";
  content?: TextContent;
  model?: StringOrVariable;
}

export interface Context extends Entity, Size, TextStyle {
  type: "context";
  content?: TextContent;
}

/** Icon from a font */
export interface IconFont extends Entity, Size, CanHaveEffects {
  type: "icon_font";
  /** Name of the icon in the icon font */
  iconFontName?: StringOrVariable;
  /** Icon font to use. Valid fonts are 'lucide', 'feather', 'Material Symbols Outlined', 'Material Symbols Rounded', 'Material Symbols Sharp', 'phosphor' */
  iconFontFamily?: StringOrVariable;
  /** Variable font weight, only valid for icon fonts with variable weight. Values from 100 to 700. */
  weight?: NumberOrVariable;
  fill?: Fills;
}

/** References allow reusing other objects in different places. */
export interface Ref extends Entity {
  type: "ref";
  /** The \`ref\` property must be another object's ID. */
  ref: string;
  /** This can be used to customize the properties of descendant objects except the \`children\` property. */
  descendants?: {
    [
      key: string /** Each key is an ID path pointing to a descendant object. */
    ]: {} /** Descendant objects can be customized in two manners:
- Property overrides: only the customized properties are present with their new values. In this case, the \`id\`, \`type\` and \`children\` properties must not be specified!
- Object replacement: in this case, this object must be a completely new node tree, that will replace the original descendant of the referenced component. This is useful for adding custom content to instances of container-type components (cards, windows, panels, etc). */;
  };
  [key: string]: any;
}

export type Child =
  | Frame
  | Group
  | Rectangle
  | Ellipse
  | Line
  | Path
  | Polygon
  | Text
  | Note
  | Prompt
  | Context
  | IconFont
  | Ref;

export type IdPath = string;

export interface Document {
  version: "2.10";
  themes?: { [key: string /** RegEx: [^:]+ */]: string[] };
  imports?: {
    [
      key: string
    ]: string /** Each value is a relative URI of an imported .pen file, from which variables and reusable components are made available in the current file. The key is a short alias for the imported file. */;
  };
  variables?: {
    [key: string /** RegEx: [^:]+ */]:
      | {
          type: "boolean";
          value:
            | BooleanOrVariable
            | { value: BooleanOrVariable; theme?: Theme }[];
        }
      | {
          type: "color";
          value: ColorOrVariable | { value: ColorOrVariable; theme?: Theme }[];
        }
      | {
          type: "number";
          value:
            | NumberOrVariable
            | { value: NumberOrVariable; theme?: Theme }[];
        }
      | {
          type: "string";
          value:
            | StringOrVariable
            | { value: StringOrVariable; theme?: Theme }[];
        };
  };
  children: (
    | Frame
    | Group
    | Rectangle
    | Ellipse
    | Line
    | Polygon
    | Path
    | Text
    | Note
    | Context
    | Prompt
    | IconFont
    | Ref
  )[];
}

\`\`\``,zwt={Code:{content:`# Instructions when generating code from .pen files\r
\r
- IMPORTANT: Make sure to use the frontend frameworks that are already used in the project. For example, if the project is using React, always generate compliant React code.\r
- IMPORTANT: After generating code, DO NOT output Markdown files of the changes. Just stick to generating code and nothing else.\r
- IMPORTANT: Make sure to use and leverage the CSS libraries, design systems and other UI coding utilities that are already used in the project. For example, if the project is using Tailwind, make sure to style your code using Tailwind.\r
- IMPORTANT: Make sure when using CSS libraries and frameworks that you identify the installed version and always use the correct APIs that are supported by the installed versions.\r
- IMPORTANT: When generating code from .pen designs, always make sure to use the same text labels, icons ans spacing as what is in the design.\r
- DO NOT create documentations for the changes when generating code from design.\r
- Explore the workspace to find if the design elements you are translating to code are already exist in the code base.\r
- Make sure to awlays use the correct font, icons, and UI details like border radius when generating the code from a design.\r
- If you are not sure what frontend frameworks and UI libraries are used in the project, explore it in the workspace.\r
- If the UI design element you are turning code into already exist in the codebase, update it, not generate a new one.\r
- When changing existing components and UI elements in the code, make sure to not break the functionality.\r
\r
## Initial Setup\r
\r
### Project Initialization\r
\r
- Identify the frontend framework and language used in the project (e.g., React, Vue, Angular, Svelte, etc.)\r
- Use the same framework, language, and conventions as the existing project\r
- Identify the styling approach (e.g., Tailwind, CSS Modules, styled-components, etc.)\r
- If using Tailwind, refer to 'tailwind' topic for implementation details\r
\r
### Pre-Implementation Verification\r
\r
- Ensure CSS/styles compile without errors\r
- Verify all CSS variables are accessible (if using CSS custom properties)\r
- Confirm styling system is properly configured and loaded\r
\r
## Component Implementation Workflow\r
\r
### Step 1: Component Analysis and Extraction\r
\r
#### 1A. Identify Required Components\r
\r
- Read the target frame/design\r
- Identify which reusable components (refs) are used in this specific frame\r
- **IMPORTANT**: Only process components that appear in the current frame\r
- Count instances of each component (helps catch missing instances later)\r
- Document: "Component X used N times"\r
\r
#### 1B. Extract Component Definitions\r
\r
- Use \`batch_get\` to get component structure\r
- Extract full component tree with all nested children\r
- Process components ONE AT A TIME:\r
  1. Extract component with full depth\r
  2. Recreate in React (Step 2)\r
  3. Validate (Step 3)\r
  4. Move to next component only after validation passes\r
\r
#### 1C. Map Component Instances\r
\r
- Read the target frame structure\r
- For each component, identify ALL instances\r
- Document for each instance:\r
  * Instance ID and location\r
  * Nested component overrides (\`descendants\` map)\r
  * Props/values being passed\r
- **Nested Component Analysis**:\r
  * Check base component definition: Does it always include nested components?\r
  * Check all instances: Do any override/hide nested components?\r
  * **Decision Rule**:\r
    - If NO instances override away → Nested component is REQUIRED (always render)\r
    - If ANY instances override away → Nested component is OPTIONAL (conditional render)\r
  * Verify each nested component ref in base definition against all instances\r
- **Visual Verification**:\r
  * Use \`get_screenshot\` on instances in context (not just base definition)\r
  * Verify visible elements (borders, backgrounds, shadows)\r
  * Check if styling should be on outer container or nested elements\r
  * Match visual appearance in frame context\r
\r
### Step 2: React Component Creation\r
\r
#### Component Structure\r
\r
- Create \`.tsx\` file in \`src/components/\` with component name\r
- Use named exports\r
- Define TypeScript interfaces for all props\r
\r
#### Props Interface Design\r
\r
- Review ALL instances from Step 1C mapping\r
- Support all properties used by any instance (including optional ones)\r
- **Nested Component Rendering**:\r
  * Apply decision rule from Step 1C:\r
    - NO instances override away → Always render (required)\r
    - ANY instances override away → Conditional render (optional)\r
  * Verify against instance mapping before making props optional\r
- Document required vs optional props based on actual usage\r
- Cross-reference with instance mapping to ensure completeness\r
\r
#### Style Implementation\r
\r
- Use Tailwind classes exclusively (NO inline styles)\r
- Refer to tailwind.md sections: "Layout Conversion", "Style Implementation", "CSS Custom Properties and Font Stacks"\r
- Match design values exactly (use arbitrary values when needed)\r
- Use CSS variables for colors (no hardcoded values)\r
\r
#### SVG Path Implementation\r
\r
When implementing SVG elements from the design:\r
\r
**1. Extract Exact Geometry**\r
- Use \`batch_get\` with \`includePathGeometry: true\`\r
- NEVER approximate paths - extract exact \`geometry\` property from design\r
\r
**2. Properties to Extract**\r
- \`geometry\` - use as \`d\` attribute in \`<path>\`\r
- \`fill\` - convert design variables to CSS variables (e.g., \`$primary\` → \`var(--primary)\`)\r
- \`stroke\` properties if present (\`strokeColor\`, \`strokeThickness\`)\r
- \`width\` and \`height\` for viewBox calculation\r
\r
**3. Implementation**\r
- Use exact geometry string in \`d\` attribute\r
- Set \`viewBox="0 0 {width} {height}"\`\r
- Preserve all stroke properties\r
- For styling, see tailwind.md "SVG Styling" section for Tailwind-specific syntax\r
\r
**4. Logos and Complex Icons**\r
- Extract complete geometry even if very long\r
- Don't simplify or approximate\r
- Maintain precision for brand assets\r
\r
### Step 3: Component Validation\r
\r
1. **Visual Verification**:\r
   - Use \`get_screenshot\` on design component\r
   - Compare with rendered React component\r
   - Verify pixel-perfect match\r
\r
2. **Style Verification**:\r
   - Inspect computed CSS properties\r
   - Verify dimensions, spacing, colors, typography match design\r
   - Ensure CSS variables resolve correctly\r
\r
3. **Behavior Verification**:\r
   - Test fill_container elements expand properly\r
   - Test fit_content elements size to content\r
   - Verify no overflow issues\r
\r
4. **Iterative Fixing**:\r
   - Fix discrepancies immediately\r
   - Re-validate after each fix\r
   - Only proceed to next component when current is perfect\r
\r
### Step 4: Frame Integration\r
\r
#### Pre-Integration Analysis\r
\r
- Read complete target frame with \`maxDepth: 10\`\r
- Map component tree structure\r
- Identify all component instances\r
\r
#### Instance Configuration\r
\r
- Document all property overrides for each instance\r
- Verify nested component overrides\r
- Create instance mapping with exact props\r
- **Layout Context**:\r
  * Check parent container layout mode\r
  * If flex container with multiple \`fill_container\` children → each needs \`flex-1\`\r
  * Document which components need \`flex-1\` based on parent layout\r
\r
#### Completeness Verification\r
\r
- Count component instances in design vs implementation\r
- Verify all props match design overrides\r
- Confirm nested components follow required/optional decision from Step 1C\r
- Use checklist:\r
  * [ ] All instances accounted for\r
  * [ ] All props match overrides\r
  * [ ] Nested components render correctly (always vs conditional)\r
  * [ ] Layout classes applied correctly (\`flex-1\`, etc.)\r
\r
### Step 5: Final Validation\r
\r
- Verify component positions and spacing match design\r
- Verify colors resolve correctly\r
- Verify typography matches\r
- Verify responsive behavior:\r
  * Layout adapts to different viewport sizes\r
  * Scrollable areas work when content exceeds space\r
  * No horizontal overflow\r
  * \`fill_container\` elements expand properly\r
  * \`fit_content\` elements size to content\r
- Verify no console errors\r
- Verify all interactive elements function correctly\r
\r
## Key Principles\r
\r
- Use the project's styling system consistently (avoid inline styles when possible)\r
- If using Tailwind, see tailwind.md for Tailwind-specific implementation details\r
- Match design values exactly\r
- Use the project's color system (CSS variables, design tokens, theme files, etc.) - avoid hardcoded values\r
- Process components one at a time with validation\r
- Verify nested component rendering requirements\r
- Ensure proper styling and layout based on parent context`,description:"Generating code from .pen files"},"Design System":{content:`# Design System Composition Guidelines\r
\r
Helpful patterns for composing screens and dashboards using design system components in \`.pen\` files. These are suggestions to get you started—feel free to adapt them to your needs.\r
\r
---\r
\r
## 1. Common Component Patterns\r
\r
Component naming patterns you might encounter:\r
- \`Button/*\` — Button variants\r
- \`Input/*\` or \`Input Group/*\` — Form inputs\r
- \`Card\` — Card containers\r
- \`Sidebar\` — Navigation sidebar\r
- \`Table\` or \`Data Table\` — Table elements\r
- \`Alert/*\` — Feedback alerts\r
- \`Modal/*\` or \`Dialog\` — Modal dialogs\r
\r
---\r
\r
## 2. Understanding Slots\r
\r
Slots are placeholder frames inside components where you insert child components. They're marked with the \`slot\` property containing an array of recommended component IDs.\r
\r
### How to Identify Slots\r
\r
When reading a component, look for frames with slot property:\r
\`\`\`json\r
{\r
  "id": "slotId",\r
  "name": "Content Slot",\r
  "slot": ["recommendedComponentId1", "recommendedComponentId2"]\r
}\r
\`\`\`\r
\r
### How to Use Slots\r
\r
A typical approach:\r
1. **Insert the parent component** and capture its binding\r
2. **Insert children into the slot** using path: \`parentBinding/slotId\`\r
3. **Consider using recommended components** listed in the slot's \`slot\` array (though you can insert other content too)\r
\r
\`\`\`javascript\r
sidebar=I(page, {type: "ref", ref: "sidebarComponentId", height: "fill_container"})\r
item1=I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemId", descendants: {...}})\r
item2=I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemId", descendants: {...}})\r
\`\`\`\r
\r
If you don't need to use a particular slot in a component instance, mark the slot \`enabled: false\` to hide it.\r
\r
---\r
\r
## 3. Icons\r
\r
### Available Icon Sets\r
\r
You can use \`icon_font\` type for icons with these font families:\r
\r
| Font Family | Style | Example Names |\r
|-------------|-------|---------------|\r
| \`lucide\` | Outline, rounded | \`home\`, \`settings\`, \`user\`, \`search\`, \`plus\`, \`x\` |\r
| \`feather\` | Outline, rounded | \`home\`, \`settings\`, \`user\`, \`search\`, \`plus\`, \`x\` |\r
| \`Material Symbols Outlined\` | Outline | \`home\`, \`settings\`, \`person\`, \`search\`, \`add\`, \`close\` |\r
| \`Material Symbols Rounded\` | Rounded | \`home\`, \`settings\`, \`person\`, \`search\`, \`add\`, \`close\` |\r
| \`Material Symbols Sharp\` | Sharp corners | \`home\`, \`settings\`, \`person\`, \`search\`, \`add\`, \`close\` |\r
\r
### Icon Usage\r
\r
Standalone icon with Lucide, and Material Symbols with weight:\r
\r
\`\`\`javascript\r
icon=I(container, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "settings", width: 24, height: 24, fill: "$--foreground"})\r
icon=I(container, {type: "icon_font", iconFontFamily: "Material Symbols Rounded", iconFontName: "dashboard", width: 24, height: 24, fill: "$--foreground", weight: 400})\r
\`\`\`\r
\r
### Overriding Icons in Components\r
\r
When a component contains an icon, override it via descendants:\r
\`\`\`javascript\r
descendants: {\r
  "iconNodeId": { iconFontName: "settings" }\r
}\r
\`\`\`\r
\r
### Common Icon Names\r
\r
| Action | Lucide/Feather | Material Symbols |\r
|--------|----------------|------------------|\r
| Home | \`home\` | \`home\` |\r
| Settings | \`settings\` | \`settings\` |\r
| User | \`user\` | \`person\` |\r
| Search | \`search\` | \`search\` |\r
| Add | \`plus\` | \`add\` |\r
| Close | \`x\` | \`close\` |\r
| Edit | \`edit\`, \`pencil\` | \`edit\` |\r
| Delete | \`trash\`, \`trash-2\` | \`delete\` |\r
| Check | \`check\` | \`check\` |\r
| Arrow right | \`arrow-right\` | \`arrow_forward\` |\r
| Chevron down | \`chevron-down\` | \`expand_more\` |\r
| Menu | \`menu\` | \`menu\` |\r
| Dashboard | \`layout-dashboard\` | \`dashboard\` |\r
| Folder | \`folder\` | \`folder\` |\r
| File | \`file\` | \`description\` |\r
| Calendar | \`calendar\` | \`calendar_today\` |\r
| Mail | \`mail\` | \`mail\` |\r
| Bell | \`bell\` | \`notifications\` |\r
\r
---\r
\r
## 4. Sidebar Composition\r
\r
### Structure\r
\r
\`\`\`\r
Sidebar Component\r
├── Header (logo, brand)\r
├── Content Slot ← Insert navigation items here\r
└── Footer (user profile, settings)\r
\`\`\`\r
\r
### Populating Sidebar Navigation\r
\r
Insert the sidebar, then add section title (if available), active item, and default items:\r
\r
\`\`\`javascript\r
sidebar=I(page, {type: "ref", ref: "sidebarId", height: "fill_container"})\r
newSectionTitle=I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarSectionTitleId", descendants: {"labelTextId": {content: "Main Menu"}}})\r
itemDashboard=I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemActiveId", descendants: {"iconId": {iconFontName: "dashboard"}, "labelId": {content: "Dashboard"}}})\r
itemUsers=I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemDefaultId", descendants: {"iconId": {iconFontName: "users"}, "labelId": {content: "Users"}}})\r
itemSettings=I(sidebar+"/contentSlotId", {type: "ref", ref: "sidebarItemDefaultId", descendants: {"iconId": {iconFontName: "settings"}, "labelId": {content: "Settings"}}})\r
\`\`\`\r
\r
---\r
\r
## 5. Card Composition\r
\r
### Structure\r
\r
Cards typically have three slots:\r
\r
\`\`\`\r
Card Component\r
├── Header Slot ← Title, description\r
├── Content Slot ← Main content\r
└── Actions Slot ← Buttons\r
\`\`\`\r
\r
### Populating Card Slots\r
\r
Insert card, replace header with custom content, setup content slot for form, setup actions slot with buttons:\r
\r
\`\`\`javascript\r
card=I(container, {type: "ref", ref: "cardId", width: 480})\r
newNode=R(card+"/headerSlotId", {type: "frame", layout: "vertical", gap: 4, padding: 24, width: "fill_container", children: [\r
  {type: "text", content: "Card Title", fill: "$--foreground", fontFamily: "$--font-primary", fontSize: 18, fontWeight: "600"},\r
  {type: "text", content: "Card description goes here", fill: "$--muted-foreground", fontFamily: "$--font-secondary", fontSize: 14}\r
]})\r
U(card+"/contentSlotId", {layout: "vertical", gap: 16, padding: 24})\r
input=I(card+"/contentSlotId", {type: "ref", ref: "inputGroupId", width: "fill_container", descendants: {"labelId": {content: "Email"}}})\r
U(card+"/actionsSlotId", {gap: 12, justifyContent: "end", padding: 24})\r
cancelBtn=I(card+"/actionsSlotId", {type: "ref", ref: "buttonOutlineId", descendants: {"iconId": {enabled: false}, "labelId": {content: "Cancel"}}})\r
saveBtn=I(card+"/actionsSlotId", {type: "ref", ref: "buttonPrimaryId", descendants: {"iconId": {enabled: false}, "labelId": {content: "Save"}}})\r
\`\`\`\r
\r
---\r
\r
## 6. Tab Composition\r
\r
### Structure\r
\r
\`\`\`\r
Tabs Container\r
└── Direct children: Tab Items (active/inactive)\r
\`\`\`\r
\r
### Building Tabs\r
\r
Insert tabs container, then add tab items directly (first one active):\r
\r
\`\`\`javascript\r
tabs=I(container, {type: "ref", ref: "tabsId", width: "fit_content"})\r
tab1=I(tabs, {type: "ref", ref: "tabItemActiveId", descendants: {"labelId": {content: "General"}}})\r
tab2=I(tabs, {type: "ref", ref: "tabItemInactiveId", descendants: {"labelId": {content: "Security"}}})\r
tab3=I(tabs, {type: "ref", ref: "tabItemInactiveId", descendants: {"labelId": {content: "Billing"}}})\r
\`\`\`\r
\r
---\r
\r
## 7. Dropdown Composition\r
\r
### Structure\r
\r
\`\`\`\r
Dropdown Container\r
└── Direct children: Search, Dividers, Titles, List Items\r
\`\`\`\r
\r
### Building Dropdowns\r
\r
Optional search, divider, section title, and items:\r
\r
\`\`\`javascript\r
dropdown=I(container, {type: "ref", ref: "dropdownId", height: "fit_content"})\r
search=I(dropdown, {type: "ref", ref: "searchBoxId"})\r
divider=I(dropdown, {type: "ref", ref: "listDividerId"})\r
title=I(dropdown, {type: "ref", ref: "listTitleId", descendants: {"labelId": {content: "Actions"}}})\r
optionA=I(dropdown, {type: "ref", ref: "listItemCheckedId", descendants: {"labelId": {content: "Option A"}}})\r
optionB=I(dropdown, {type: "ref", ref: "listItemUncheckedId", descendants: {"labelId": {content: "Option B"}}})\r
\`\`\`\r
\r
---\r
\r
## 8. Table Composition\r
\r
### Table Structure\r
\r
\`\`\`\r
Table (frame)\r
├── Table Header — Search/filter + action buttons\r
├── Table Wrapper — Contains all rows\r
│   ├── Header Row (frame)\r
│   │   └── Cell (frame)\r
│   │       └── Content (text, label, button, etc.)\r
│   ├── Data Row 1 (frame)\r
│   │   └── Cell (frame)\r
│   │       └── Content (text, label, button, etc.)\r
│   ├── Data Row 2 (frame)\r
│   │   └── Cell (frame)\r
│   │       └── Content (text, label, button, etc.)\r
│   └── ...\r
└── Table Footer — Row count + pagination\r
\`\`\`\r
\r
### Building Tables Step by Step\r
\r
### Table Hierarchy\r
\r
**Important:** Tables follow this strict nesting structure:\r
Table → Row → Cell (frame) → Cell Content (text, label, button, etc.)\r
\r
- **Table**: Container with vertical layout holding all rows\r
- **Row**: Horizontal container holding cells\r
- **Cell**: Frame wrapper that controls column width\r
- **Cell Content**: The actual content inside the cell (text, badges, buttons, etc.)\r
\r
**Add data rows with cells**\r
\r
Note: For tables with many rows, split into multiple \`batch_design\` calls (e.g., 2-3 rows per call).\r
\r
\`\`\`javascript\r
row1=I(table, {type: "ref", ref: "dataTableRowId", width: "fill_container"})\r
nameCell=I(row1, {type: "ref", ref: "dataTableCellId", width: "fill_container"})\r
nameText=I(nameCell, {type: "text", content: "John Doe"})\r
emailCell=I(row1, {type: "ref", ref: "dataTableCellId", width: "fill_container"})\r
emailText=I(emailCell, {type: "text", content: "john@example.com"})\r
statusCell=I(row1, {type: "ref", ref: "dataTableCellId", width: 120})\r
statusBadge=I(statusCell, {type: "ref", ref: "labelSuccessId", descendants: {"textId": {content: "Active"}}})\r
actionsCell=I(row1, {type: "ref", ref: "dataTableCellId", width: 100})\r
actionBtn=I(actionsCell, {type: "ref", ref: "iconButtonId"})\r
\`\`\`\r
\r
### Column Width Strategy\r
\r
Suggested starting points (adjust as needed):\r
\r
| Column Type | Typical Width |\r
|-------------|-------|\r
| Primary identifier (name) | 200-250px |\r
| Email, URL | \`fill_container\` |\r
| Status, badge | 100-120px |\r
| Date | 120-150px |\r
| Actions | 80-100px |\r
| Numbers | 80-100px |\r
\r
---\r
\r
## 9. Pagination Composition\r
\r
### Structure\r
\r
\`\`\`\r
Pagination Component\r
├── Previous Button\r
├── Page Numbers Slot ← Insert page items here\r
└── Next Button\r
\`\`\`\r
\r
### Building Pagination\r
\r
Insert page numbers into slot:\r
\r
\`\`\`javascript\r
pagination=I(container, {type: "ref", ref: "paginationId"})\r
page1=I(pagination+"/pageNumbersSlotId", {type: "ref", ref: "paginationItemActiveId", descendants: {"labelId": {content: "1"}}})\r
page2=I(pagination+"/pageNumbersSlotId", {type: "ref", ref: "paginationItemDefaultId", descendants: {"labelId": {content: "2"}}})\r
page3=I(pagination+"/pageNumbersSlotId", {type: "ref", ref: "paginationItemDefaultId", descendants: {"labelId": {content: "3"}}})\r
ellipsis=I(pagination+"/pageNumbersSlotId", {type: "ref", ref: "paginationItemEllipsisId"})\r
page10=I(pagination+"/pageNumbersSlotId", {type: "ref", ref: "paginationItemDefaultId", descendants: {"labelId": {content: "10"}}})\r
\`\`\`\r
\r
---\r
\r
## 10. Screen Layout Patterns\r
\r
These patterns show the structure for common layouts. Each pattern is typically one batch_design call (3-5 ops). Combine with content from other sections to reach maximum 25 ops per call, or use as a first call then populate sections in subsequent calls.\r
\r
### Pattern A: Sidebar + Content (Dashboard)\r
\r
\`\`\`\r
┌──────────┬────────────────────────────────┐\r
│          │                                │\r
│ Sidebar  │     Main Content Area          │\r
│  280px   │      fill_container            │\r
│          │                                │\r
└──────────┴────────────────────────────────┘\r
\`\`\`\r
\r
\`\`\`javascript\r
screen=I(document, {type: "frame", name: "Dashboard", layout: "horizontal", width: 1440, height: "fit_content(900)", fill: "$--background", placeholder: true})\r
sidebar=I(screen, {type: "ref", ref: "sidebarId", height: "fill_container"})\r
main=I(screen, {type: "frame", layout: "vertical", width: "fill_container", height: "fill_container(900)", padding: 32, gap: 24})\r
\`\`\`\r
\r
### Pattern B: Header + Content\r
\r
\`\`\`\r
┌────────────────────────────────────────────┐\r
│              Header Bar (64px)             │\r
├────────────────────────────────────────────┤\r
│                                            │\r
│            Content Area                    │\r
│                                            │\r
└────────────────────────────────────────────┘\r
\`\`\`\r
\r
Fixed header and scrollable content:\r
\r
\`\`\`javascript\r
screen=I(document, {type: "frame", layout: "vertical", width: 1200, height: "fit_content(800)", fill: "$--background", placeholder: true})\r
header=I(screen, {type: "frame", layout: "horizontal", width: "fill_container", height: 64, padding: [0, 24], alignItems: "center", justifyContent: "space_between", stroke: {align: "inside", fill: "$--border", thickness: {bottom: 1}}})\r
content=I(screen, {type: "frame", layout: "vertical", width: "fill_container", height: "fit_content(736)", padding: 32, gap: 24})\r
\`\`\`\r
\r
### Pattern C: Two-Column Layout\r
\r
\`\`\`\r
┌─────────────────────┬─────────────┐\r
│                     │             │\r
│    Main (2/3)       │  Side (1/3) │\r
│   fill_container    │   360px     │\r
│                     │             │\r
└─────────────────────┴─────────────┘\r
\`\`\`\r
\r
Main column (flexible) and side column (fixed):\r
\r
\`\`\`javascript\r
columns=I(content, {type: "frame", layout: "horizontal", width: "fill_container", height: "fill_container(900)", gap: 24})\r
mainCol=I(columns, {type: "frame", layout: "vertical", width: "fill_container", height: "fit_content(900)", gap: 24})\r
sideCol=I(columns, {type: "frame", layout: "vertical", width: 360, height: "fit_content(900)", gap: 24})\r
\`\`\`\r
\r
### Pattern D: Card Grid\r
\r
\`\`\`\r
┌──────────┐ ┌──────────┐ ┌──────────┐\r
│  Card 1  │ │  Card 2  │ │  Card 3  │\r
└──────────┘ └──────────┘ └──────────┘\r
\`\`\`\r
\r
\`\`\`javascript\r
cardGrid=I(container, {type: "frame", layout: "horizontal", width: "fill_container", gap: 16})\r
card1=I(cardGrid, {type: "ref", ref: "cardId", width: "fill_container"})\r
card2=I(cardGrid, {type: "ref", ref: "cardId", width: "fill_container"})\r
card3=I(cardGrid, {type: "ref", ref: "cardId", width: "fill_container"})\r
\`\`\`\r
\r
---\r
\r
## 11. Common Compositions\r
\r
These snippets show maximum 25 ops each. Combine with screen layout patterns, or use as standalone batch_design calls after the initial structure is created.\r
\r
### Page Header with Breadcrumbs + Actions\r
\r
Breadcrumbs on the left, action buttons on the right:\r
\r
\`\`\`javascript\r
pageHeader=I(main, {type: "frame", layout: "horizontal", width: "fill_container", justifyContent: "space_between", alignItems: "center"})\r
breadcrumbs=I(pageHeader, {type: "frame", layout: "horizontal", gap: 0, alignItems: "center"})\r
crumb1=I(breadcrumbs, {type: "ref", ref: "breadcrumbItemId", descendants: {"labelId": {content: "Dashboard"}}})\r
sep=I(breadcrumbs, {type: "ref", ref: "breadcrumbSeparatorId"})\r
crumb2=I(breadcrumbs, {type: "ref", ref: "breadcrumbItemActiveId", descendants: {"labelId": {content: "Users"}}})\r
actions=I(pageHeader, {type: "frame", layout: "horizontal", gap: 12})\r
exportBtn=I(actions, {type: "ref", ref: "buttonOutlineId", descendants: {"iconId": {enabled: false}, "labelId": {content: "Export"}}})\r
addBtn=I(actions, {type: "ref", ref: "buttonPrimaryId", descendants: {"iconId": {enabled: false}, "labelId": {content: "Add User"}}})\r
\`\`\`\r
\r
### Form Layout\r
\r
Two fields in a row, then full-width fields:\r
\r
\`\`\`javascript\r
card=I(container, {type: "ref", ref: "cardId", width: "fill_container"})\r
form=I(card+"/contentSlotId", {type: "frame", layout: "vertical", gap: 16, width: "fill_container"})\r
row=I(form, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})\r
firstName=I(row, {type: "ref", ref: "inputGroupId", width: "fill_container", descendants: {"labelId": {content: "First Name"}}})\r
lastName=I(row, {type: "ref", ref: "inputGroupId", width: "fill_container", descendants: {"labelId": {content: "Last Name"}}})\r
email=I(form, {type: "ref", ref: "inputGroupId", width: "fill_container", descendants: {"labelId": {content: "Email"}}})\r
message=I(form, {type: "ref", ref: "textareaGroupId", width: "fill_container", descendants: {"labelId": {content: "Message"}}})\r
\`\`\`\r
\r
### Metric Cards\r
\r
Replace header with custom metric content, disable unused slots:\r
\r
\`\`\`javascript\r
metrics=I(content, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})\r
metric1=I(metrics, {type: "ref", ref: "cardId", width: "fill_container"})\r
newNode=R(metric1+"/headerSlotId", {type: "frame", layout: "vertical", gap: 4, padding: 24, width: "fill_container", children: [\r
  {type: "text", content: "Total Users", fill: "$--muted-foreground", fontFamily: "$--font-secondary", fontSize: 14},\r
  {type: "text", content: "12,543", fill: "$--foreground", fontFamily: "$--font-primary", fontSize: 32, fontWeight: "600"}\r
]})\r
U(metric1+"/contentSlotId", {enabled: false})\r
U(metric1+"/actionsSlotId", {enabled: false})\r
\`\`\`\r
\r
---\r
\r
## 12. Spacing Reference\r
\r
Common spacing values as a starting point:\r
\r
| Context | Gap | Padding |\r
|---------|-----|---------|\r
| Screen sections | 24-32 | — |\r
| Card grid | 16-24 | — |\r
| Form fields (vertical) | 16 | — |\r
| Form row (horizontal) | 16 | — |\r
| Button groups | 12 | — |\r
| Inside cards | — | 24 |\r
| Inside buttons | — | [10, 16] |\r
| Inside inputs | — | [8, 16] |\r
| Page content area | — | 32 |\r
| Sidebar items | 0 | [12, 16] |\r
\r
---\r
\r
## 13. Button Hierarchy\r
\r
A good rule of thumb: one primary action per section helps users focus. Rough priority order:\r
\r
| Priority | Variant | Often used for |\r
|----------|---------|---------|\r
| 1 | Primary/Default | Main action (Save, Submit, Create) |\r
| 2 | Secondary | Alternative actions |\r
| 3 | Outline | Tertiary, Cancel, Back |\r
| 4 | Ghost | Inline actions, navigation |\r
| 5 | Destructive | Delete, Remove |\r
\r
### Button Actions Alignment\r
\r
Common conventions:\r
- **Cards/Modals:** Right-align actions (\`justifyContent: "end"\`)\r
- **Forms:** Right-align submit buttons\r
- **Toolbars:** Left-align primary, right-align secondary\r
- **Destructive + Cancel:** Cancel on left, Destructive on right\r
\r
---\r
\r
## 14. Design Tokens\r
\r
Using design token variables helps keep things consistent:\r
\r
### Colors\r
| Token | Usage |\r
|-------|-------|\r
| \`$--background\` | Page background |\r
| \`$--foreground\` | Primary text |\r
| \`$--muted-foreground\` | Secondary text, placeholders |\r
| \`$--card\` | Card backgrounds |\r
| \`$--border\` | Borders, dividers |\r
| \`$--primary\` | Primary actions, brand |\r
| \`$--secondary\` | Secondary elements |\r
| \`$--destructive\` | Danger actions |\r
\r
### Semantic Colors\r
| State | Background | Foreground |\r
|-------|------------|------------|\r
| Success | \`$--color-success\` | \`$--color-success-foreground\` |\r
| Warning | \`$--color-warning\` | \`$--color-warning-foreground\` |\r
| Error | \`$--color-error\` | \`$--color-error-foreground\` |\r
| Info | \`$--color-info\` | \`$--color-info-foreground\` |\r
\r
### Typography\r
| Token | Usage |\r
|-------|-------|\r
| \`$--font-primary\` | Headings, labels, navigation |\r
| \`$--font-secondary\` | Body text, descriptions, inputs |\r
\r
### Border Radius\r
| Token | Usage |\r
|-------|-------|\r
| \`$--radius-none\` | Tables, sharp containers |\r
| \`$--radius-m\` | Cards, modals |\r
| \`$--radius-pill\` | Buttons, inputs, badges |\r
\r
---\r
\r
## 15. Design Principles\r
\r
These principles help ensure designs are grounded, consistent, and maintainable.\r
\r
### Visual Hierarchy\r
- One clear focal point per section\r
- Use size, weight, and color to establish importance\r
- Primary actions should be visually dominant\r
\r
### Alignment & Grid\r
- Align elements to an implicit grid\r
- Use consistent edge alignment within containers\r
- Avoid orphaned or floating elements\r
\r
### Spacing Consistency\r
- Always use existing gap/padding values from the design system\r
- Don't mix arbitrary spacing values - pick from the established scale\r
- Maintain consistent vertical rhythm between sections\r
\r
### Color Usage\r
- Always use \`$--variable\` tokens, never hardcode hex/rgb values\r
- Ensure sufficient contrast for text readability\r
- Use semantic colors for their intended purpose (error for errors, etc.)\r
\r
### Content Density\r
- Don't overcrowd - leave breathing room\r
- Cards should contain one primary idea\r
- Tables should have reasonable column counts (typically 4-7)\r
\r
### Grounding Rules\r
- Get component list via \`get_editor_state\` and then only get specific components you need via \`batch_get\`\r
- Verify with \`get_screenshot\` after major design operations\r
- Use existing components before creating custom frames`,description:"Composing screens with design system components"},"Landing Page":{content:`# Landing Page Design Guidelines\r
\r
---\r
\r
## Purpose\r
\r
**Conversion intent.** Drive one action — sign up, buy, request a demo. Make every element move the visitor toward that action. Remove everything that doesn't.\r
\r
**Transformation over features.** Show the outcome, not the tool. Visitors buy a better version of themselves — show them who they become.\r
\r
## Content\r
\r
**Hero = the entire pitch compressed.** Compress the entire pitch into the first screen. Communicate what this is, why it matters, and what to do next. Use one idea, one headline, one call to action.\r
\r
**Headline strength.** Lead with the strongest headline form. Transformation ("Finally feel in control") beats outcome ("Ship faster"), which beats benefit ("Write 10x faster"), which beats feature ("AI writing assistant").\r
\r
**Imagery.** Show scenes from the visitor's future — people in the outcome state, not product screenshots in isolation. Always add a contrast treatment when placing text over images — overlay, shadow, or text in its own container. Never stretch or distort.\r
\r
**Color for conversion.** Make the CTA the most prominent element on the page. Reserve the accent color for actions — don't dilute it across decorative elements. Ensure sufficient contrast for all text against its background.\r
\r
## Structure\r
\r
**Composition.** Pick one alignment axis per section — never mix left-aligned and centered content in the same section. Group related elements tightly, separate groups generously — proximity signals relationship.\r
\r
**Rhythm.** Alternate between text-heavy and visual sections. Never stack sections with similar density. Use dark sections for credibility and depth, light sections for explanation and detail.\r
\r
**Typography.** Never set body text below 14px. Choose a typographic scale with clear size jumps between hierarchy levels. Don't center-align more than 2-3 lines of text. Keep body copy line length to 50-75 characters.\r
\r
**Section flow.** Build a narrative arc — promise, proof, action. Move from what it is, to why it works, to why you should trust it, to what to do next.\r
\r
**Content before visuals.** Define the narrative and messaging before making visual decisions. Let the words drive the design, not the other way around.`,description:"Designing landing pages and promotional websites"},"Mobile App":{content:`# MOBILE APP SCREEN COMPOSITION — SYSTEM PROMPT\r
\r
You are a world-class mobile product designer. Your job is to design mobile app screens that feel modern, premium, fast, and easy to scan. Prioritize clarity, hierarchy, touch ergonomics, and platform conventions. Produce screens that are buildable.\r
\r
## Primary Rule\r
Every screen is composed as a vertical stack of:\r
1) Status Bar (OS-controlled)\r
2) App Content (your layout)\r
3) Bottom Bar (optional but common: Tab Bar / Bottom Nav)\r
\r
Design within this structure first, then refine typography, spacing, components, and visual style.\r
\r
---\r
\r
## 1) STATUS BAR (OS-CONTROLLED)\r
\r
### What it is\r
The top OS area showing time, signal, battery, etc.\r
\r
### Rules\r
- Height must be **62 px**.\r
- Content must be **vertically centered** within the bar.\r
- The time label must use **"SF Pro"** as the primary font. If SF Pro is not available, fall back to **"Inter"**.\r
- Never place critical UI behind the status bar.\r
- Always respect safe areas / status bar insets.\r
- If using an immersive/hero header, ensure legibility and safe spacing under the status bar.\r
- Avoid custom fake status bars. Treat it as untouchable OS chrome.\r
\r
### Desired behavior\r
- The app content begins below the status bar (unless intentionally using an edge-to-edge hero with proper safe-area padding).\r
\r
---\r
\r
## 2) APP CONTENT (YOUR LAYOUT)\r
\r
### What it is\r
Everything between the status bar and the bottom bar.\r
\r
### Wrapper & Spacing Model\r
> **CRITICAL:** ALL app content elements — without exception — must sit inside **one wrapper container** (a single vertical stack / column). Never place content elements outside this wrapper. This is a non-negotiable structural requirement.\r
\r
The wrapper provides:\r
- **Consistent left and right padding** (e.g., 16–20 px) applied once at the wrapper level — individual sections should not add their own horizontal padding.\r
- **Gap-based vertical spacing** between sibling sections (use the layout engine's \`gap\` property rather than per-element margins). Choose a gap value that creates clear separation between blocks (e.g., 24–32 px between major sections, 12–16 px between tightly related items within a section).\r
\r
### Content stacking order (inside the wrapper)\r
1. Top context (optional): Title / navigation header / search / filters\r
2. Primary content: the "job to be done" for the screen\r
3. Supporting content: secondary modules, help text, empty states, legal microcopy\r
4. Floating actions (optional): FAB or sticky CTA (only if it doesn't fight bottom navigation)\r
\r
### Rules\r
- One primary intent per screen. Everything else is subordinate.\r
- Strong hierarchy: the first 1–2 elements must explain "where am I" + "what can I do here".\r
- **Typography consistency:** Use the **same font size for all "Title" text** across every screen. Titles must look uniform app-wide — do not vary title font size from screen to screen.\r
- Design for one-handed use:\r
  - Primary actions should usually be reachable (lower half) unless they are global nav.\r
- Scrolling:\r
  - If content is long, use a single vertical scroll container (avoid nested scrolls unless required).\r
  - Headers can be sticky if they improve clarity (e.g., segmented controls, filters).\r
- Touch targets:\r
  - Ensure tappable elements have comfortable hit areas.\r
- States:\r
  - Always consider loading, empty, error, and success states as first-class.\r
\r
### Do / Don't\r
- DO keep key CTAs visible without scrolling when feasible.\r
- DO prefer simple stacks over complex grids on mobile.\r
- DO rely on the wrapper's \`gap\` for all vertical spacing — avoid ad-hoc margins.\r
- DO use bottom padding (via the 4-value \`padding: [top, right, bottom, left]\` syntax) on the content container for empty space at the bottom — set it to the **same value as the container's \`gap\`** for visual consistency.\r
- DON'T cram multiple competing sections above the fold.\r
- DON'T add per-section horizontal padding — let the wrapper handle it.\r
- DON'T use spacer elements to create empty space at the bottom of the content area — use bottom padding instead.\r
- DON'T hide critical actions in hard-to-reach corners if the screen is action-heavy.\r
\r
---\r
\r
## 3) BOTTOM BAR — PILL-STYLE TAB BAR\r
\r
### What it is\r
A persistent, floating pill-shaped navigation bar at the bottom of the screen — icon + label tab items inside a rounded capsule.\r
\r
### When to use\r
- Most multi-section apps benefit from a Tab Bar.\r
- Use when users switch between 3–5 top-level destinations frequently.\r
\r
### Layout & sizing\r
- **Tab Bar Container**: full screen width, content centered. Padding: **12 px top, 21 px right/bottom/left** (accounts for home-indicator safe area).\r
- **Pill** (menu items wrapper): fixed height **62 px**, \`fill_container\` width. Corner radius: **36 px**. Border: 1 px solid (theme border color). Inner padding: **4 px vertical, 4 px horizontal**.\r
- **Tab Items**: horizontal row, each item \`fill_container\` width, \`fill_container\` height. Corner radius: **26 px**. Layout: vertical, gap **4 px**, centered on both axes.\r
- **Icon**: 18 px. **Label**: 10 px, weight 500–600, uppercase, ~0.5 px letter-spacing.\r
\r
### Active vs. inactive states\r
- **Active tab**: solid fill (theme accent color), icon + label in contrasting color. Must be **immediately obvious** — use a solid fill, not just a color shift.\r
- **Inactive tabs**: transparent background, icon + label in muted color.\r
\r
### Rules\r
- **3–5 tabs** max — top-level destinations only, not contextual actions.\r
- Labels must always be **uppercase**.\r
- Respect **safe-area bottom inset** — the container's bottom padding accounts for this.\r
- Tab switching preserves each tab's navigation stack/state. Avoid surprising resets.\r
- App content must never be obscured by the Tab Bar — add bottom padding in scroll areas.\r
- Sticky CTAs must not overlap the Tab Bar (place CTA above it, or hide the Tab Bar for that screen if justified).\r
\r
---\r
\r
## Screen Blueprint (MANDATORY)\r
For every screen you design, explicitly describe it in this order:\r
- Status Bar: (standard / edge-to-edge with safe padding)\r
- App Content:\r
  - Header area:\r
  - Primary content area:\r
  - Secondary content area:\r
  - Primary action placement:\r
  - Scroll behavior:\r
- Bottom Bar:\r
  - None / Pill Tab Bar (list tabs) / other\r
  - How content avoids overlap:\r
\r
---\r
\r
## Default Recommendation (IF UNSURE)\r
- Use a standard status bar + safe area.\r
- Use a simple header (title + optional right action).\r
- Place content in a single vertical scroll.\r
- Use a pill-style Tab Bar with 4–5 top-level destinations for most main app screens.`,description:"Designing mobile apps"},Slides:{content:`ROLE: You are a professional slide deck designer.\r
GOAL: Produce slides that are readable in real conditions (projector, Zoom, mobile).\r
PRIORITY: Clarity > Readability > Hierarchy > Simplicity.\r
\r
\r
CRITICAL — FIRST PRIORITY\r
INPUT: Brand guidelines will be given but are NOT slide-optimized.\r
RULE: Always adapt brand for slides (bigger fonts, more spacing, change more if needed). Never sacrifice readability.\r
\r
CORE RULES:\r
- One idea per slide.\r
- Slides are visual aids, not documents.\r
- If content doesn’t fit at required sizes: split or remove. Never shrink fonts.\r
- Consistency > creativity. Reduce cognitive load.\r
\r
CRITICAL – TYPOGRAPHY:\r
- Max 2 font families.\r
- Body >=24px (prefer 28–32).\r
- Titles >=40px.\r
- Key numbers can be larger.\r
- Use weight, not many sizes.\r
- Avoid ALL CAPS except labels.\r
- Line-height ~1.1–1.2.\r
- High contrast always.\r
\r
LAYOUT & SPACING:\r
- Use grid. Align everything.\r
- Generous whitespace.\r
- No clutter.\r
- Apply CRAP: Contrast, Repetition, Alignment, Proximity.\r
\r
COLOR:\r
- 2–3 core colors + neutrals.\r
- High contrast text/bg mandatory.\r
- Accent only for emphasis.\r
- Body text neutral.\r
- Colorblind-safe if possible.\r
\r
VISUALS & DATA:\r
- Visuals support meaning, not decoration.\r
- Prefer custom visuals to stock.\r
- Charts > text for data.\r
- One insight per chart.\r
- Simplify charts (no junk).\r
- Highlight key datapoint.\r
- Icons consistent style/size.\r
\r
FORMAT:\r
- 16:9, 1920x1080.\r
- Keep content >=100px from edges.\r
\r
CONTENT DENSITY:\r
- One message per slide.\r
- Short phrases > sentences.\r
- No paragraphs.\r
- Title states takeaway.\r
- Details go to notes/appendix.\r
\r
CONTEXT:\r
- Corp=structured.\r
- Startup=minimal, bold.\r
- Marketing=benefit-driven.\r
- Internal=slightly denser.\r
- Keynote=very visual.\r
(Rules above always apply.)\r
\r
LAYOUT CONTRACTS (use IDs, follow strictly):\r
\r
L01:\r
Intent=Cover\r
Grid=CenterStack\r
Content=Title(48-64,Bold); Subtitle(28-32); Meta(20-24)\r
Rules=CenterXY; PlentySpace; NoExtras\r
\r
L02:\r
Intent=BoldCover\r
Grid=LeftBlock\r
Content=Title(56-72,Max2Lines); Subtitle(28); Meta\r
Rules=LeftMargin~120; Logo=BR; NoClutter\r
\r
L03:\r
Intent=SectionBreak\r
Grid=Center\r
Content=Label(24,Muted); Title(48-56)\r
Rules=OnlyThese2; MaxWhitespace\r
\r
L04:\r
Intent=KeyStatement\r
Grid=Center\r
Content=Statement(36-48,Max2Lines); OptionalAttribution(24)\r
Rules=Only1Message\r
\r
L05:\r
Intent=Concept+Visual\r
Grid=2col(50/50)\r
Left=Title(36-40)+Body(24-28,Max4Lines)\r
Right=Image\r
Rules=Gap>=40; CenterY; NoOverflow\r
\r
L06:\r
Intent=Concept+Visual\r
Grid=2col(50/50)\r
Left=Image\r
Right=Title(36-40)+Body(24-28,Max4Lines)\r
Rules=Mirror(L05)\r
\r
L07:\r
Intent=3Pillars\r
Grid=3col\r
Each=Visual+Label(28)+Desc(20,Max2Lines)\r
Rules=EqualWidth; SameTopY; Gap=30-50\r
\r
L08:\r
Intent=Compare2\r
Grid=2col\r
Each=Heading(28-32)+Points(24,2-4)\r
Rules=BalancedContent; Gap=40-60\r
\r
L09:\r
Intent=SingleKPI\r
Grid=CenterStack\r
Content=Label(24,Muted); Number(120-200); Context(24-28)\r
Rules=NumberIsHero; NothingCompetes\r
\r
L10:\r
Intent=TwoKPIs\r
Grid=2col\r
Each=Number(80-120)+Label(24)\r
Rules=EqualWeight\r
\r
L11:\r
Intent=ThreeKPIs\r
Grid=3col\r
Each=Number(64-80)+Label(24)\r
Rules=SameBaseline\r
\r
L12:\r
Intent=Quote\r
Grid=CenterStack\r
Content=Quote(28-36,Max3Lines); Attribution(20-24)\r
Rules=GenerousPadding\r
\r
L13:\r
Intent=Process\r
Grid=Row(3-5Steps)\r
Each=Icon/Number+Label(28)+Desc(20,1Line)\r
Rules=EqualSpacing; SameBaseline\r
\r
L14:\r
Intent=HeroImage\r
Grid=FullBleed\r
Content=OverlayTitle(40-56)+Subtitle(24-28)\r
Rules=DarkOverlay; HighContrast\r
\r
L15:\r
Intent=Matrix4\r
Grid=2x2\r
Each=Heading(28)+Desc(20)\r
Rules=EqualCards; Gap=20-30\r
\r
L16:\r
Intent=IconRow\r
Grid=Row(3-4)\r
Each=Icon+Label(28)+Desc(20,1-2Lines)\r
Rules=SameIconSize; AlignBaselines\r
\r
L17:\r
Intent=Data+Insight\r
Grid=Stack\r
Content=Chart(~60%H); Insight(24-28,Bold)\r
Rules=1Highlight; NoChartJunk\r
\r
L18:\r
Intent=BeforeAfter\r
Grid=2col+Arrow\r
Left=Before(Muted)\r
Right=After(Strong)\r
Rules=ClearContrast\r
\r
L19:\r
Intent=List\r
Grid=Stack\r
Content=Title(40); Items(28,3-5)\r
Rules=NoWrap; LargeGaps\r
\r
L20:\r
Intent=Closing\r
Grid=CenterStack\r
Content=Headline(48-56); Sub(24-28); Contact(24)\r
Rules=Clean; FinalImpression\r
\r
OPENING & CLOSING SLIDES:\r
- First and last slides are STATEMENTS — emotional, not informational.\r
- Combine a strong visual with powerful words. Image + text working together.\r
- These set the tone (opening) and leave the lasting impression (closing).\r
- Aim for feeling, not facts.\r
\r
TEXT-ONLY SLIDES:\r
- When a slide has no visual, let typography do the emotional heavy lifting.\r
- Be courageous: oversized type, unexpected alignment, asymmetric layout.\r
- Break the grid if it serves the message. Unusual ≠ unreadable.\r
- The text IS the visual — treat it as such.\r
\r
SELECTION:\r
- Opening: L01,L02 (emotional statement + visual)\r
- Section: L03\r
- Statement/Quote: L04,L12\r
- Concept+Visual: L05,L06,L14\r
- Features: L07,L16\r
- Compare: L08,L18\r
- KPI: L09,L10,L11\r
- Process: L13\r
- Matrix: L15\r
- Data: L17\r
- List: L19\r
- Closing: L20 (emotional statement + visual)\r
\r
OUTPUT RULES:\r
- Be concrete.\r
- No theory, no filler.\r
- Use sizes, spacing, alignment explicitly.\r
- If unclear: ask <=3 questions OR list <=5 assumptions.`,description:"Designing presentation slides"},Table:{content:`## Table\r
\r
- Use the following rules **only when there is no predefined Table component or Table frame** in the design system or document.\r
- Table responsive multi screen design: Unless specifically defined, when converting a wide multi-column table to a mobile version, consider using cards instead of table\r
\r
### Table Hierarchy\r
\`\`\`\r
Table (frame, vertical layout)\r
├── Header Row (frame, horizontal, width: fill_container, height: fixed)\r
│   ├── Cell (frame, width: fixed, height: fill_container)\r
│   │   └── Text (text, bold, textGrowth: fixed-width)\r
│   ├── Cell (frame, width: fixed, height: fill_container)\r
│   │   └── Text (text, bold, textGrowth: fixed-width)\r
│   └── ...\r
├── Data Row (frame, horizontal, width: fill_container, height: fixed)\r
│   ├── Cell (frame, width: fixed, height: fill_container)\r
│   │   └── Text (text, textGrowth: fixed-width)\r
│   ├── Cell (frame, width: fixed, height: fill_container)\r
│   │   └── Text (text, textGrowth: fixed-width)\r
│   └── ...\r
├── Data Row ...\r
└── ...\r
\`\`\`\r
\r
- If the user does not specify data, generate **dummy placeholder values** for each cell.\r
- Cells may contain other components (e.g., label, button) instead of text if explicitly requested.`,description:"Working with tables and dashboards"},Tailwind:{content:'# Tailwind v4 Implementation Guidelines\r\n\r\nThis document provides Tailwind v4 specific guidelines for implementing .pen designs in code.\r\n\r\n**NOTE**: These guidelines are specific to Tailwind v4. If you are deliberately using an older version of Tailwind (v3 or earlier), you may bypass the v4-specific syntax rules (such as `@import "tailwindcss";` vs `@tailwind` directives) and adapt accordingly.\r\n\r\n## Core Principle\r\n\r\n**Use Tailwind classes exclusively throughout - NEVER use inline styles for any property (sizing, colors, spacing, typography, etc.).**\r\n\r\n## CSS Variables Setup\r\n\r\n### Structure of globals.css\r\n\r\nYour `globals.css` should follow this structure:\r\n\r\n```css\r\n@import "tailwindcss";\r\n\r\n:root {\r\n  /* Design variables from .pen file - ONLY single values */\r\n  --color-primary: #3b82f6;\r\n  --color-secondary: #8b5cf6;\r\n  --spacing-base: 16px;\r\n  /* DO NOT store font stacks here */\r\n}\r\n\r\n@layer base {\r\n  html, body {\r\n    height: 100%;\r\n  }\r\n\r\n  /* Font family utilities - Define font stacks directly here */\r\n  .font-primary {\r\n    font-family: "Inter", sans-serif;\r\n  }\r\n\r\n  .font-secondary {\r\n    font-family: "JetBrains Mono", monospace;\r\n  }\r\n}\r\n```\r\n\r\n### Guidelines\r\n\r\n- Read design variables using `get_variables`\r\n- Convert to CSS custom properties in `:root` block for single values only (colors, numbers, keywords)\r\n- Map all design variables using exact names from design file\r\n- **IMPORTANT**: Use `:root` block for design variables (NOT `@theme` - Tailwind v4\'s `@theme` only supports custom properties and `@keyframes`)\r\n- **DO NOT add manual resets** - `@import "tailwindcss";` includes Preflight automatically\r\n- **CRITICAL for Next.js projects**: If using `next/font` loaders, DO NOT re-wrap their CSS variables (like `--font-geist`) in your `:root` block. Instead, reference them directly in `@layer base` utility classes (see Font Loading section)\r\n\r\n## Font Implementation\r\n\r\n### Core Rules\r\n\r\n**CSS variables work for single values only** (colors, numbers, keywords). **DO NOT use them for font stacks.**\r\n\r\n❌ **WRONG**:\r\n```css\r\n:root {\r\n  --font-primary: "JetBrains Mono", monospace;  /* Breaks with comma-separated values */\r\n}\r\n```\r\n\r\n✅ **CORRECT**: Define fonts in `@layer base` utility classes:\r\n```css\r\n@layer base {\r\n  .font-primary {\r\n    font-family: "JetBrains Mono", monospace;\r\n  }\r\n  \r\n  .font-secondary {\r\n    font-family: "Inter", sans-serif;\r\n  }\r\n}\r\n```\r\n\r\n### Next.js Font Loaders\r\n\r\nWhen using `next/font/google` or `next/font/local`:\r\n\r\n❌ **NEVER wrap Next.js font variables in `:root`**:\r\n```css\r\n/* WRONG - nested var() references break */\r\n:root {\r\n  --font-primary: var(--font-geist);\r\n}\r\n```\r\n\r\n✅ **DO reference them directly in utility classes**:\r\n```css\r\n@layer base {\r\n  .font-primary {\r\n    font-family: var(--font-jetbrains-mono), "JetBrains Mono", monospace;\r\n  }\r\n}\r\n```\r\n\r\n### Implementation Workflow\r\n\r\n1. Read font names from design using `get_variables`\r\n2. Load fonts via `<link>` tags OR Next.js font loaders in layout.tsx\r\n3. Create utility classes in `@layer base` (`.font-primary`, `.font-secondary`)\r\n4. Use classes in components: `className="font-primary"`\r\n5. **NEVER use** `font-[var(--font-name)]` or inline styles for fonts\r\n\r\n## Font Loading\r\n\r\n### Tailwind v4 Requirements\r\n\r\n❌ **NEVER in Tailwind v4**:\r\n- `@import url()` in CSS files\r\n- `font-[family-name:var(...)]` syntax\r\n- `--turbopack` flag\r\n\r\n✅ **Load fonts via**:\r\n- `<link>` tags in layout.tsx `<head>`, OR\r\n- Next.js font loaders (`next/font/google`, `next/font/local`)\r\n\r\n### Examples\r\n\r\n**Option 1: Manual loading**\r\n```tsx\r\n// layout.tsx\r\n<head>\r\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />\r\n</head>\r\n```\r\n\r\n**Option 2: Next.js font loaders**\r\n```tsx\r\n// layout.tsx\r\nimport { JetBrains_Mono } from "next/font/google";\r\n\r\nconst jetbrainsMono = JetBrains_Mono({\r\n  variable: "--font-jetbrains-mono",\r\n  subsets: ["latin"],\r\n});\r\n\r\nexport default function RootLayout({ children }) {\r\n  return (\r\n    <html>\r\n      <body className={jetbrainsMono.variable}>\r\n        {children}\r\n      </body>\r\n    </html>\r\n  );\r\n}\r\n```\r\n\r\n```css\r\n/* globals.css */\r\n@layer base {\r\n  .font-primary {\r\n    font-family: var(--font-jetbrains-mono), "JetBrains Mono", monospace;\r\n  }\r\n}\r\n```\r\n\r\n## Icon Font Setup\r\n\r\n- **If design uses `icon_font` nodes**:\r\n  1. Add Google Fonts link in layout.tsx `<head>` (following the Font Loading Rules above)\r\n  2. Add utility class in `@layer base` section of globals.css with appropriate font-feature-settings\r\n  3. Render as `<span>` elements with icon name as text content\r\n  4. Use inline styles for font-weight if needed (e.g., `style={{ fontWeight: 100 }}`)\r\n  5. **NEVER use `@font-face`** - Always use CDN links\r\n\r\n## Viewport Setup\r\n\r\n- Add `height: 100%` to `html` and `body` in `@layer base` section of globals.css (as shown in CSS Variables Setup example)\r\n- Add `h-full` class to `<html>` and `<body>` in layout.tsx\r\n- Ensures viewport-relative sizing works throughout app\r\n- Design dimensions are specifications, not fixed constraints\r\n- **DO NOT use wildcard selectors** - use the `@layer base` approach shown above\r\n\r\n## Tailwind v4 Import and Preflight\r\n\r\n### Correct Import Syntax\r\n\r\n**Tailwind v4 uses a simplified import syntax** in `globals.css`:\r\n\r\n```css\r\n@import "tailwindcss";\r\n```\r\n\r\nThis single import automatically includes:\r\n- Base styles (Preflight reset)\r\n- Component classes\r\n- Utility classes\r\n\r\n**DO NOT use the old v3 syntax**:\r\n```css\r\n/* ❌ WRONG - This is v3 syntax */\r\n@tailwind base;\r\n@tailwind components;\r\n@tailwind utilities;\r\n```\r\n\r\n### Preflight Reset Behavior\r\n\r\nThe `@import "tailwindcss";` automatically includes Preflight, which:\r\n- Removes margins and padding from all elements\r\n- Sets `box-sizing: border-box` on all elements\r\n- Resets headings and lists (they inherit font properties)\r\n- Makes images block-level with responsive sizing\r\n\r\n### Critical Rules\r\n\r\n- **NEVER manually add global resets** - Preflight handles everything\r\n- **NEVER use wildcard selectors** like `* { margin: 0; padding: 0; }` in globals.css\r\n- **DO NOT duplicate Preflight functionality** - it\'s already included\r\n- Use `@layer base { ... }` ONLY for additional custom base styles that don\'t conflict with Preflight\r\n\r\n## Layout Conversion\r\n\r\n### Container Sizing\r\n\r\n- Root containers: `h-full w-full` or `h-screen w-screen` (NOT fixed dimensions)\r\n- Fixed dimensions only for specific elements (e.g., sidebar: `w-[280px]`)\r\n\r\n### fill_container Translation\r\n\r\n- In flex containers: use `flex-1`\r\n- For explicit sizing: `w-full` (width), `h-full` (height)\r\n- **IMPORTANT**: `h-full` requires parent chain has height set\r\n- For scrollable containers: `flex-1 overflow-auto`\r\n- **NEVER use inline styles** for sizing\r\n- **Multiple fill_container Children**:\r\n  * In flex containers, multiple children with `fill_container` → each needs `flex-1`\r\n  * Applies to both horizontal and vertical flex layouts\r\n  * Distributes space equally among children\r\n- **Height fill_container**:\r\n  * ANY component with `height: "fill_container"` MUST have `h-full` class\r\n  * Applies universally regardless of component type or parent layout\r\n  * Verify every `fill_container` height has corresponding `h-full` class\r\n\r\n### fit_content Translation\r\n\r\n- Use `w-fit` (width), `h-fit` (height)\r\n- NEVER use inline styles\r\n\r\n### Flex Context\r\n\r\n- Parent must be flex container for `flex-1` to work\r\n- Use `min-h-0` on flex children that need to shrink below content size\r\n- Scrollable flex children: `flex-1 overflow-auto`\r\n\r\n### Verification\r\n\r\n- Check ALL `fill_container`/`fit_content` converted to Tailwind classes\r\n- Ensure NO inline styles for width/height\r\n\r\n## Style Implementation\r\n\r\nUse **Tailwind classes exclusively** (NO inline styles) for all styling:\r\n\r\n### 1. Layout\r\n\r\n- Position: `relative`, `absolute`, `fixed`, `sticky`\r\n- Display: `flex`, `flex-col`, `grid`, `block`, `inline-block`\r\n- Alignment: `items-center`, `justify-between`, etc.\r\n- Gap: `gap-4`, `gap-[16px]` (match design exactly)\r\n\r\n### 2. Spacing\r\n\r\nMatch design values exactly:\r\n- Padding: `p-4`, `px-6`, `pt-[12px]`, etc.\r\n- Margin: `m-4`, `mx-auto`, `mt-[8px]`, etc.\r\n- Use arbitrary values `[Npx]` when needed\r\n\r\n### 3. Dimensions\r\n\r\n- Width: `w-[280px]` (fixed), `w-full` or `flex-1` (fill_container), `w-fit` (fit_content)\r\n- Height: `h-[48px]` (fixed), `h-full` or `flex-1` (fill_container), `h-fit` (fit_content)\r\n- Min/max: `min-w-[200px]`, `max-h-[600px]`\r\n- **CRITICAL**: Never use inline styles for dimensions\r\n\r\n### 4. Colors and Borders\r\n\r\n- Background: `bg-[var(--color-name)]` - NO hardcoded hex values\r\n- Border: `border`, `border-2`, `border-[var(--color-border)]`\r\n- Border radius: `rounded`, `rounded-lg`, `rounded-[12px]`\r\n- Text: `text-[var(--color-text)]`\r\n- Shadows: `shadow-sm`, `shadow-[custom]`\r\n\r\n### 5. Typography\r\n\r\n- **Font family**: Use utility classes defined in `@layer base` (see "CSS Custom Properties and Font Stacks" section above)\r\n  - ✅ Correct: `className="font-primary"`\r\n  - ❌ NEVER: `font-[var(--font-primary)]` (arbitrary value syntax doesn\'t work with CSS variables)\r\n  - ❌ NEVER: `style={{ fontFamily: \'var(--font-primary)\' }}` (avoid inline styles unless necessary)\r\n  - For Next.js font loaders: Create utility classes that reference the Next.js variables, then use those classes\r\n- Font size: `text-sm`, `text-[14px]`\r\n- Font weight: `font-medium`, `font-[500]`\r\n- Line height: `leading-normal`, `leading-[24px]`\r\n- Letter spacing: `tracking-normal`, `tracking-[0.02em]`\r\n\r\n### 6. Interactive States\r\n\r\n- Hover: `hover:bg-[var(--color-hover)]`, `hover:opacity-80`\r\n- Active: `active:scale-95`\r\n- Disabled: `disabled:opacity-50`, `disabled:cursor-not-allowed`\r\n- Focus: `focus:outline-none`, `focus:ring-2`\r\n\r\n## SVG Styling\r\n\r\nFor SVG path extraction and implementation workflow, see code.md "SVG Path Implementation" section.\r\n\r\n### Tailwind-Specific SVG Styling\r\n\r\nWhen styling SVG elements with Tailwind:\r\n\r\n- **Fill colors**: Use `fill-[var(--color-name)]` with CSS variables\r\n  - Example: `fill-[var(--primary)]`\r\n- **Stroke colors**: Use `stroke-[var(--color-name)]`\r\n  - Example: `stroke-[var(--border)]`\r\n- **Stroke width**: Use `stroke-[2]` or arbitrary values `stroke-[1.5px]`\r\n- **SVG sizing**: Use standard sizing classes `w-6 h-6` or arbitrary `w-[24px] h-[24px]`\r\n- **NEVER use inline styles** - always use Tailwind classes or className with CSS variables\r\n\r\nExample:\r\n```tsx\r\n<svg className="w-6 h-6 fill-[var(--icon-primary)]" viewBox="0 0 24 24">\r\n  <path d="M12 2L2 7l10 5 10-5-10-5z" />\r\n</svg>\r\n```',description:"Tailwind CSS v4 implementation"},"Web App":{content:`# WEBAPP SYSTEM PROMPT \r
\r
You are designing a responsive web application interface.\r
\r
This document defines universal product design principles that apply to ANY use case:\r
CRM, analytics, editor, marketplace, fintech, admin panel, AI tool, or unknown future systems.\r
\r
Visual identity, typography, color, and stylistic expression are defined in \`brand.md\`.\r
\r
This file defines structural, cognitive, and product-quality laws.\r
\r
Do not generate marketing pages.\r
Generate functional product UI only.\r
\r
---\r
\r
# 1. Purpose First\r
\r
Every screen must have a clearly defined primary purpose.\r
\r
- A screen should answer one dominant user question.\r
- A screen should support one primary action.\r
- If multiple goals compete, separate them into distinct surfaces.\r
\r
No multi-purpose cluttered screens.\r
\r
---\r
\r
# 2. Dominant Region Rule\r
\r
Every screen must contain one dominant visual region.\r
\r
- Visual weight must reflect importance.\r
- Secondary regions must be subordinate.\r
- Avoid equal-weight layouts.\r
- Avoid competing focal points.\r
\r
Hierarchy is mandatory.\r
\r
---\r
\r
# 3. Understandability\r
\r
The interface must explain itself.\r
\r
- Labels must be clear.\r
- Actions must be recognizable.\r
- Icons must not replace essential text.\r
- System state must be visible.\r
\r
If a user must guess what something does, redesign it.\r
\r
---\r
\r
# 4. Progressive Disclosure\r
\r
Reveal complexity gradually.\r
\r
- Show essential information first.\r
- Advanced controls must be contextual.\r
- Do not overwhelm with full capability at once.\r
- Detail views should open on demand.\r
\r
Complexity is allowed.\r
Confusion is not.\r
\r
---\r
\r
# 5. Recognition Over Recall\r
\r
Reduce cognitive load.\r
\r
- Surface relevant actions when needed.\r
- Do not require users to remember previous states.\r
- Keep navigation predictable.\r
- Use consistent placement of controls.\r
\r
The system must reduce thinking effort.\r
\r
---\r
\r
# 6. System Status Visibility\r
\r
The system must always communicate state.\r
\r
Every data-driven surface must support:\r
\r
- Loading state\r
- Empty state\r
- Error state\r
- Success confirmation\r
- Permission or restriction state (when applicable)\r
\r
No silent failure.\r
No blank ambiguity.\r
\r
---\r
\r
# 7. Action Hierarchy\r
\r
Actions must scale logically.\r
\r
- One primary action per screen or section.\r
- Secondary actions visually reduced.\r
- Destructive actions clearly distinct.\r
- Rare actions placed in overflow.\r
\r
Do not give equal emphasis to all actions.\r
\r
Honest emphasis only.\r
\r
---\r
\r
# 8. Structural Consistency\r
\r
Patterns must repeat across the system.\r
\r
- Similar problems → similar solutions.\r
- Navigation logic must remain stable.\r
- Layout rhythm must feel system-driven.\r
- Spacing must follow a consistent scale.\r
\r
Predictability builds trust.\r
\r
---\r
\r
# 9. Density Intentionality\r
\r
Density must be deliberate.\r
\r
Allowed modes:\r
\r
- Compact → high data environments\r
- Medium → balanced default\r
- Airy → low-complexity workflows\r
\r
Do not mix density modes arbitrarily within one screen.\r
\r
---\r
\r
# 10. Spatial Logic\r
\r
Layout must be architectural.\r
\r
- One dominant axis per screen.\r
- Prefer two structural zones before three.\r
- Avoid unnecessary nested scroll containers.\r
- Use whitespace for separation.\r
- Avoid decorative dividers unless functionally needed.\r
\r
Structure over ornament.\r
\r
---\r
\r
# 11. Feedback & Response\r
\r
Every user action must produce clear feedback.\r
\r
- Immediate acknowledgment.\r
- Clear validation messaging.\r
- Reversible actions where possible.\r
- Confirm destructive operations.\r
\r
Silence after interaction is unacceptable.\r
\r
---\r
\r
# 12. Responsiveness Philosophy\r
\r
Hierarchy must survive all breakpoints.\r
\r
Mobile:\r
- Single dominant column.\r
- Secondary panels become sheets or stacked sections.\r
- No horizontal scrolling unless essential.\r
\r
Tablet:\r
- Transitional structural logic.\r
\r
Desktop:\r
- Multi-zone allowed.\r
- Higher density permitted.\r
\r
Scaling must preserve clarity.\r
\r
---\r
\r
# 13. Entity Integrity\r
\r
Whenever representing an entity (user, record, document, asset):\r
\r
- Display its name prominently.\r
- Surface its status clearly.\r
- Show key metadata.\r
- Make actions obvious.\r
\r
Entities must feel concrete and usable.\r
\r
---\r
\r
# 14. Constraint Over Decoration\r
\r
If an element does not support:\r
\r
- Navigation\r
- Understanding\r
- Decision-making\r
- Action-taking\r
\r
It should not exist.\r
\r
As little design as possible.\r
\r
---\r
\r
# 15. Scalability\r
\r
Design decisions must scale.\r
\r
- More data must not break structure.\r
- More features must not collapse hierarchy.\r
- Growth should extend patterns, not create chaos.\r
\r
Design for longevity.\r
\r
---\r
\r
# 16. Adaptation Logic\r
\r
Infer product type from the user prompt.\r
\r
Then determine:\r
\r
- Dominant region\r
- Primary action\r
- Appropriate density\r
- Level of progressive disclosure\r
\r
Do not assume dashboards, tables, sidebars, or canvases unless required by purpose.\r
\r
Structure must emerge from utility.\r
\r
---\r
\r
End of system prompt.`,description:"Designing web apps"}},Uwt={"Aerial Gravitas":{content:'Aerial Gravitas\r\n\r\n### Identity\r\nFull-bleed aerial and landscape photography used as section-defining stage sets — not decorative accents, but structural zones that occupy entire viewport heights. The design is built from alternating photographic slabs and typographic slabs; remove the photography and the rhythm collapses. Every photographic block carries a tonal overlay that shifts the surface from neutral to a deep, saturated `surface.inverse` plane, making imagery and content zones feel like one continuous material.\r\n\r\n### Composition\r\nStacked full-width horizontal sections with hard cuts between them — no gradual transitions, no overlapping zones. Within each section, content follows an asymmetric split: hero text anchors left at large scale, supporting text and CTAs cluster right. The numbered services list uses a full-width two-column extreme split — numbers flush left, service names flush right — creating a stretched ledger-like reading axis. A floating `surface.primary` card overlaps the boundary between the final photograph section and its edge, creating the only instance of layered depth in the layout.\r\n\r\n### Spatial Density\r\nModerate to sparse. Each section contains a small number of elements — a headline, one or two lines of body, a single CTA — surrounded by generous vertical breathing room. The services list is the densest zone, but line spacing between entries keeps it airy. On smaller formats, preserve the section-per-viewport rhythm: each screen shows one section with minimal elements, never compressing multiple sections into view simultaneously.\r\n\r\n### Scale Contrast\r\nHigh — approximately 5–6x between the hero Headings and Body descriptor text. The hero headline is large and commanding, running two to three lines. The numbered list items sit at a large-but-subordinate scale, roughly 2–3x Body, forming a distinct mid-tier. This three-speed hierarchy (hero headline → list items → body/captions) is essential; all three levels must be present and clearly differentiated.\r\n\r\n### Edge Behavior\r\nLarge photographic sections bleed edge-to-edge with zero margin, occupying the full container width. Typography in content sections floats inward with generous horizontal margins, never touching the viewport edges. The floating card in the photo section is inset from the right edge with comfortable padding, sitting visually "inside" the photograph rather than against its boundary. Small elements — eyebrow labels with dot indicators, CTA buttons — sit inset and never approach edges.\r\n\r\n### Separation\r\nHard color cuts between full-width sections are the primary separator — `surface.primary` zones cut against `surface.inverse` photograph zones with no transition. A single hairline `border.subtle` rule separates the aerial hero photo from the typography section below it. No shadows on layout sections; the floating card uses `shadow.md` as the sole elevation instance. Within the services list, whitespace alone separates entries — no rules, no dividers.\r\n\r\n### Typography\r\nThe Headings category drives all hero and section headlines at high scale with relaxed, natural line-height — titles read as composed statements, not compressed slabs. The Body category handles descriptor paragraphs and nav links at normal weight. The Captions category carries eyebrow labels — short uppercase phrases with wide letter-spacing paired with a small dot indicator — marking section identity before the headline. The numbered list creates a fourth typographic register: oversized Data-style index numbers in `accent.primary` paired with large Headings-weight service names, establishing a counted-list rhythm unique to this section.\r\n\r\n### Shape\r\n`rounded.sm` for all CTA buttons — small enough to read as nearly square-cornered, signaling precision over friendliness. `rounded.none` for all section containers, photograph blocks, and the floating card. No `rounded.full` pill shapes anywhere; the design\'s authority depends on angular containment.\r\n\r\n### Color Rules\r\nTwo dominant surface zones — `surface.primary` (light, warm) for typography-led sections and `surface.inverse` (dark, deep) for photograph-led sections — alternate with each section, creating a light-dark-light cadence. `accent.primary` is used sparingly: numbered list indices, dot indicators on eyebrow labels, and CTA button fills only. A narrow strip of color-blocked rectangles (`accent.primary`, `accent.secondary`, `accent.tertiary`) appears as a single decorative moment at the transition between the hero and services section — its only occurrence. No accent color in body text, headings, or borders.\r\n\r\n### Decoration\r\nFull-bleed aerial and landscape photography is the primary decorative layer, carrying both atmosphere and section identity. Thin geometric construction lines — straight ruled grids overlaid on the aerial photograph at low opacity in `accent.primary` — evoke cartographic survey work and reinforce the precision positioning of the brand. A single row of small color-block rectangles at one section break is the only abstract decorative element; it is used once and never repeated.',parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},data:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.inverse","foreground.primary","foreground.secondary","foreground.inverse","border.subtle","accent.primary","accent.secondary","accent.tertiary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.sm"]},elevation:{source:"elevation",keys:["shadow.md"]},decorativeImagery:{source:"imagery.decorative",options:["Aerial Photography","Landscape Photography","Cartographic Grid Overlay"]}}},"Artisan Editorial":{content:`Artisan Editorial Warm\r
\r
### Identity\r
Full-bleed lifestyle photography — warm, human, atmospheric — used as the hero stage, with display typography overlaid directly on it. The design's emotional register is defined by the combination of photographic warmth and illustrated architectural detail artwork: hand-rendered building illustrations appear as inset content images, giving the design the feel of a handcrafted editorial magazine rather than a digital product page. Remove either the warm photography or the illustrated artwork and the artisan identity collapses.\r
\r
### Composition\r
Two compositional modes alternate. The hero is a full-bleed portrait photograph with the brand name overlaid at large scale, flanked by small contextual labels at the left and right edges. Below, the layout uses an asymmetric two-column split: body text left, illustrated image right — then flips: large photograph left, body text right — creating a mirrored alternating rhythm. The final section uses \`surface.inverse\` as a full-width dark slab with a two-column split inside it. A centered icon marks section transitions. Visual weight alternates left-right between sections rather than holding a consistent gravitational anchor.\r
\r
### Spatial Density\r
Sparse to moderate. Each section contains one photograph or illustration, one headline, two to three body paragraphs, and occasionally a bullet list — all with generous vertical padding above and below. The hero is the densest zone due to the overlaid labels and eyebrow text, but even there, emptiness dominates. On smaller formats, collapse to single-column stacked; preserve vertical breathing room between sections rather than compressing content.\r
\r
### Scale Contrast\r
Moderate. The hero brand name runs large but does not bleed past edges — it sits contained within the photograph at approximately 5–6x Body size. Section headlines run at 3–4x Body, creating a clear but not extreme hierarchy. A centered amenities bar below the hero uses small all-caps labels at roughly 1x Body size, all equal-weight — a flat, non-hierarchical register. No extreme scale contrast; the design communicates through material warmth rather than typographic tension.\r
\r
### Edge Behavior\r
The hero photograph bleeds full-width to all edges. All text sections float inward with generous lateral margins, content never approaching the viewport edge. Inset images (the illustrated building artwork) are sized to roughly half the content column width and sit flush with the column boundary on one side — never floating centered or bleeding. The \`surface.inverse\` bottom section bleeds full-width but its internal content respects the same inset margins as the light sections.\r
\r
### Separation\r
A horizontal row of small all-caps amenity labels separated by hairline \`border.subtle\` vertical dividers serves as the primary structural separator between the hero and body sections. Within body sections, whitespace alone separates elements. The \`surface.inverse\` section creates a color-cut boundary with no rule or transition. No shadows, no elevation — entirely flat. The centered decorative icon (an ornamental brand mark) marks section transitions without using a rule.\r
\r
### Typography\r
The Headings category carries the hero brand name and all section headlines — the hero name uses light or thin weight for an elegant, refined quality; section headlines use regular weight with natural line-height. The Body category handles all running paragraphs and the bullet list at comfortable reading size. The Captions category carries the eyebrow label ("WHERE YOUR BEST WORK HAPPENS"), flanking contextual labels ("WORKSPACE AND PRIVATE OFFICES", "DOWNTOWN EDMOND OKLAHOMA"), the amenity bar items, and the section identifier ("ABOUT") — all uppercase with wide letter-spacing, functioning as wayfinding and metadata throughout.\r
\r
### Shape\r
\`rounded.none\` for all section containers, the hero photograph, and the \`surface.inverse\` slab. \`rounded.sm\` for the outlined CTA button overlaid on the hero photograph and the "LEARN MORE" button in the final section — barely softened, signaling restraint. \`rounded.none\` is the dominant shape language; the near-square button corners reinforce the artisan, non-digital aesthetic.\r
\r
### Color Rules\r
\`surface.primary\` is a warm, muted sand tone that holds across all light sections — it unifies the page and harmonizes with the warm photography. \`surface.inverse\` is a deep olive-brown used for the final content section, providing a grounded, earthy contrast zone. \`accent.primary\` (a terracotta-adjacent warm tone) appears in the nav bar background, the "RESERVE YOUR SPACE" CTA button, the hero CTA button border, and the decorative brand icon — used consistently as the single action and brand color. \`foreground.primary\` on \`surface.primary\` and \`foreground.inverse\` on \`surface.inverse\`. No secondary or tertiary accents; the palette is deliberately narrow and warm.\r
\r
### Decoration\r
Two distinct decorative image types: warm lifestyle photography (people working in brick-and-timber environments) and hand-rendered architectural illustrations of the building exterior and aerial view. The illustrated style is the more distinctive decorative choice — it signals craft and investment in the physical space rather than relying on stock photography alone. A small ornamental brand icon (a stylized architectural flourish) appears as a centered section divider mark. No mesh gradients, no abstract geometric elements.`,parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.inverse","foreground.primary","foreground.secondary","foreground.inverse","border.subtle","accent.primary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.sm"]},decorativeImagery:{source:"imagery.decorative",options:["Lifestyle Workspace Photography","Architectural Hand Illustrations","Ornamental Brand Icon"]}}},"Cinematic Alternating":{content:'Cinematic Dark Alternating\r\n\r\n### Identity\r\nMoody, full-bleed atmospheric landscape photography — misty hills, overcast skies, dramatic natural light — used as both the hero stage and as embedded imagery inside product UI mockups. The photography bleeds into the product screenshots themselves, so the mood is inescapable: even when looking at a chat interface, you see the landscape behind it. This recursive layering of landscape-within-product is the design\'s defining move. Remove the atmospheric photography and the design becomes a generic dark SaaS page; it is the photography\'s pervasive presence at every level that creates the cinematic identity.\r\n\r\n### Composition\r\nTwo compositional registers alternate. The hero is a full-bleed landscape photograph with centered typography overlaid at mid-height. Below, the feature sections use a strict alternating two-column layout: image-left/text-right, then text-left/image-right, then image-left/text-right — each pair separated by a subtle `border.subtle` hairline rule spanning the full width. The entire page below the hero sits on a near-black `surface.inverse` ground. Visual weight is consistently centered in the hero, then alternates left-right in the feature rows, creating a scanning rhythm that moves diagonally down the page.\r\n\r\n### Spatial Density\r\nModerate. Each feature row contains one product mockup image and one text block — a small icon-plus-label eyebrow, a headline, two sentences of body, and a single CTA button. Generous vertical padding above and below each row prevents crowding. The hero is the sparsest zone: only a headline, one body line, and one CTA button centered in the vast landscape. On smaller formats, collapse the alternating columns to single-column stacked; preserve the row-by-row pacing rather than compressing multiple features into view simultaneously.\r\n\r\n### Scale Contrast\r\nModerate — approximately 3–4x between the hero Headings and Body descriptor. The hero headline is prominent and centered but does not dominate at extreme scale; it reads as a considered statement rather than an architectural event. Feature section headlines sit at roughly 2–3x Body, clearly distinct but not dramatic. No extreme scale contrast; the design\'s authority comes from photographic atmosphere and compositional calm rather than typographic tension.\r\n\r\n### Edge Behavior\r\nThe hero photograph bleeds full-width to all edges. Below the hero, the `surface.inverse` background also spans full-width edge-to-edge. Content within feature rows floats inward with consistent lateral margins — text and images never approach the viewport edge. Product mockup images are inset within their column with comfortable padding. The single full-width hairline rules between feature rows span edge-to-edge as the only flush non-photographic elements.\r\n\r\n### Separation\r\nFull-width `border.subtle` hairline rules divide each alternating feature row from the next — the sole structural separator on the dark ground. The transition from the landscape hero to the dark feature section is a hard color cut with no rule or fade. No shadows on layout sections; product mockup cards use `shadow.lg` to lift them as distinct objects against the dark background. No background-color shifts between feature rows — `surface.inverse` holds throughout all feature sections.\r\n\r\n### Typography\r\nThe Headings category carries the hero headline and all feature section headlines at regular weight with natural, relaxed line-height — the tone is calm and intelligent, never aggressive. The Body category handles all descriptor paragraphs at a small comfortable size. The Captions category carries eyebrow labels — a small icon followed by a short label (`Linked Sources`, `Report Builder`, `Search Insights`) in light weight — providing the only navigational metadata in each feature row. Hierarchy is built from scale contrast between Headings and Body; weight plays a minimal role, keeping the overall tone understated.\r\n\r\n### Shape\r\n`rounded.full` for the primary CTA button ("Try for Free") — a pill shape that reads as the single approachable, soft interactive element on an otherwise severe dark page. `rounded.xl` for product mockup image containers. `rounded.lg` for small secondary CTA buttons ("View Pricing & Plans") within feature rows. `rounded.none` for the nav bar, section containers, and all structural layout elements. The contrast between the pill CTA and the rectangular layout reinforces the "one clear action" hierarchy.\r\n\r\n### Color Rules\r\n`surface.primary` exists only as the nav bar background — a near-white sliver at the very top. The entire hero and all feature sections live on `surface.inverse` (deep near-black), making darkness the dominant surface of the page. No accent color is used for fills, backgrounds, or decoration anywhere. `accent.primary` appears only in the nav "Try Free" button border/fill and possibly the eyebrow icon tint — maximum restraint. `foreground.inverse` carries all text on the dark ground. `foreground.muted` handles body text and captions at reduced contrast, preserving the moody low-contrast atmosphere. The design never shifts to a light zone below the hero; darkness is absolute.\r\n\r\n### Decoration\r\nAtmospheric landscape photography — misty mountain ranges, rolling hills under overcast skies, dramatically lit natural terrain — is the sole decorative layer, appearing full-bleed in the hero and embedded as the background within product UI mockup screenshots. The recursion of landscape-within-interface is the distinctive decorative gesture. No illustrations, no abstract shapes, no mesh gradients, no plus marks or glyph repetition.',parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.inverse","foreground.primary","foreground.muted","foreground.inverse","border.subtle","accent.primary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.lg","rounded.xl","rounded.full"]},elevation:{source:"elevation",keys:["shadow.lg"]},decorativeImagery:{source:"imagery.decorative",options:["Atmospheric Landscape Photography"]}}},"Editorial Scientific":{content:`Editorial Scientific\r
\r
### Identity\r
A full-bleed landscape photograph anchors the page as a deep, textured stage — the central visual event that everything else is arranged around and layered on top of. This photographic foundation is non-negotiable; remove it and the design collapses into an ordinary text layout. All other choices — the restrained typographic hero, the floating terminal overlay, the sparse decorative annotation marks — exist to frame and activate this photographic plane.\r
\r
### Composition\r
The layout uses a wide single-column rhythm with generous horizontal margins, placing content in an asymmetric left-heavy split at the hero level: a large headline block occupies the left half, a body text and CTA cluster the right. Below, the full-bleed photograph breaks the column constraint entirely and runs edge-to-edge. Visual weight is top-left-anchored in the hero, then recentered by the full-width image section below. The grid is loose and intuitive rather than strict — elements align relationally, not to a rigid column count.\r
\r
### Spatial Density\r
Sparse above the fold. The hero zone contains only a headline, a short descriptor paragraph, and two CTAs, surrounded by abundant \`surface.primary\` breathing room. The full-bleed image section is denser — the photograph fills the entire block and a terminal code overlay floats centered within it — but empty space still dominates the edges. On smaller formats, preserve emptiness by reducing visible elements per screen, never by compressing the same content tighter.\r
\r
### Scale Contrast\r
High, but not extreme — approximately 4–5x between the hero Headings and the Body descriptor text. The headline is large and commanding but does not crush its container; it sits comfortably with room around it. No micro-scale exists: labels and nav links sit at a small-but-legible size, creating a clean three-speed hierarchy of headline, body, and utility text.\r
\r
### Edge Behavior\r
Large elements float inward with generous margins in the hero zone — nothing touches the viewport edges. The full-bleed photograph is the single exception: it bleeds completely to the left and right container boundaries, creating the sensation of a window cut into the layout. Small elements (nav links, logo, caption labels) are inset with comfortable padding and never approach the edge.\r
\r
### Separation\r
Whitespace alone creates all separation in the hero and nav zones — no border strokes, no dividers, no background shifts. The \`surface.inverse\` terminal card floats over the photograph using \`shadow.lg\` elevation, creating a distinct foreground layer. Subtle annotation marks (figure labels, tick-mark ruler motifs) act as lightweight visual dividers at section boundaries without using formal border rules.\r
\r
### Typography\r
The Headings category drives the hero headline at high scale with relaxed line-height — multi-line titles stack with natural breathing room, not compression. The Body category handles all descriptor text, CTA labels, and nav links at normal weight and spacing. The Captions category carries eyebrow labels, figure annotations (\`FIG. 001\`, \`FIG. 002\`), and the ruler tick metadata — rendered in wide uppercase letter-spacing to signal reference material and technical precision. Hierarchy is built from scale contrast between Headings and Body, with Captions providing a distinct third register through uppercase tracking rather than size.\r
\r
### Shape\r
\`rounded.md\` for primary CTA buttons and the terminal code card. \`rounded.full\` for the secondary outlined button. \`rounded.none\` for the nav bar and all section containers. The deliberate mix — sharp containers with softened interactive elements — keeps the layout grounded while making actionable elements approachable.\r
\r
### Color Rules\r
\`surface.primary\` dominates the entire page as the warm background. \`surface.inverse\` is used exclusively for the floating terminal overlay, creating a single high-contrast dark zone that anchors the photograph section. \`accent.primary\` is reserved solely for the primary CTA button fill and the single timeline indicator mark at the bottom — it appears twice on the page, never in body text, never in nav, never decoratively. \`foreground.muted\` handles logo partners and navigation secondary text. No secondary or tertiary accents exist; restraint is absolute.\r
\r
### Decoration\r
Full-bleed landscape photography is the primary decorative layer — it functions as both atmosphere and content. Overlaid thin geometric construction lines (circular arcs, diagonal rules rendered in \`accent.primary\` at low opacity) appear on the photograph as technical annotation marks, evoking scientific diagrams and cartographic overlays. A horizontal ruler with tick marks at the bottom of the page reinforces the technical-reference register. Dot indicators on the left edge of the photograph section serve as carousel position markers.`,parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.inverse","foreground.primary","foreground.secondary","foreground.muted","foreground.inverse","accent.primary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.md","rounded.full"]},elevation:{source:"elevation",keys:["shadow.lg"]},decorativeImagery:{source:"imagery.decorative",options:["Landscape Photography","Technical Construction Overlay"]}}},"Illustrated Warm":{content:'Illustrated Product Warm\r\n\r\n### Identity\r\nHand-drawn character illustrations — a girl reading, a bear, a child at a bookshelf, rendered in a warm storybook style — flank the central product UI screenshot as decorative sentinels. This pairing of realistic software UI with playful illustration is the design\'s defining move and emotional argument: serious product, human warmth. Remove the illustrations and it becomes an indistinguishable SaaS page; remove the product screenshot and it becomes a children\'s brand. Both must coexist at the hero level.\r\n\r\n### Composition\r\nCentered single-column layout with a tight max-width text container for headlines and body, expanding to a wider container for the product mockup. The hero follows a strict vertical stacking order: announcement bar → nav → info banner → headline → body → CTA → star rating → tabbed feature selector → product screenshot. Below the fold, an asymmetric two-column split is used for "Get to know" sections — large left-anchored headline beside right-aligned body and link — with a full-width accordion-and-mockup panel beneath. Visual weight is symmetrically centered throughout.\r\n\r\n### Spatial Density\r\nModerate and well-paced. The hero text zone is sparse — a few lines of copy, one CTA, one trust signal — with visible breathing room between elements. The product mockup is intentionally information-dense, communicating software depth. Between major sections, generous vertical whitespace creates clear chapter breaks. On smaller formats, collapse the two-column splits to single-column stacked; the product mockup should scale as a unit with horizontal scroll rather than reflowing.\r\n\r\n### Scale Contrast\r\nModerate-high — approximately 4–5x between the bold hero Headings and Body descriptor text. The headline is the largest typographic element and dominates the top of the page clearly. The "Get to know Playground" section headline runs at an even larger scale, creating a section-break moment of typographic drama. Stat and trust signals (star rating, review count) sit at a small distinct scale. No extreme contrast — the design prioritizes clarity and approachability over tension.\r\n\r\n### Edge Behavior\r\nAll text and UI content sits within a centered inset container with generous lateral margins. The product mockup extends to a slightly wider container but does not bleed to the viewport edge. The illustrations break outside the mockup\'s lateral boundary and overlap into the margin zone — the only elements that escape the content column. The announcement bar and nav bar span full width flush to edges. Small CTAs and tags are inset with comfortable padding.\r\n\r\n### Separation\r\nWhitespace alone separates most sections. The tabbed feature selector uses `border.subtle` underline rules beneath inactive tabs, with `accent.primary` underline on the active tab. The product mockup floats on `surface.primary` with `shadow.lg`, clearly elevating it off the page. The accordion list uses `border.subtle` hairline rules between each row. No color-cut section breaks, no background shifts between text sections — `surface.primary` holds throughout except for a faint tinted `surface.secondary` behind the second product mockup panel.\r\n\r\n### Typography\r\nThe Headings category drives all hero and section headlines at bold weight and high scale with tight but not compressed line-height — the boldness signals confidence and accessibility simultaneously. The Body category handles descriptor paragraphs and nav links at normal weight. The Captions category carries the info banner text, star rating label, review count, tab labels, accordion row labels, and the "Watch video tour" prompt — a busy small-text register that frames and labels product zones. Hierarchy is built from bold weight contrast between Headings and Body, reinforced by scale.\r\n\r\n### Shape\r\n`rounded.full` for the primary CTA button, the announcement bar, the info banner pill, and the feature tab selector container — pill shapes dominate interactive and informational elements. `rounded.xl` for the product mockup container card and the second-section mockup panel. `rounded.lg` for UI elements within the product mockup (sidebar items, column cards). `rounded.md` for the accordion rows and secondary link elements. `rounded.none` for the nav bar and full-width structural elements.\r\n\r\n### Color Rules\r\n`surface.primary` is a warm off-white that holds across all text sections, giving the page a paper-like warmth that complements the illustrations. `accent.primary` (a saturated blue) is used for the primary CTA button, active tab indicator, inline text links, and the announcement bar background — it appears frequently but only on interactive and navigational elements, never on decorative surfaces. `accent.secondary` (a warm orange-yellow) appears in the star rating icons and small scattered illustration accent marks — the emotional warmth signal. `surface.secondary` provides a faint tint behind the lower mockup panel. No `surface.inverse` zones; the page never goes dark.\r\n\r\n### Decoration\r\nHand-drawn storybook character illustrations (children, animals, classroom objects) flank the hero product mockup — the primary and most distinctive decorative layer. Small scattered confetti or sparkle marks appear in the announcement bar background. All illustrations use a warm, limited color palette consistent with `surface.primary` warmth. No photography, no mesh gradients, no abstract geometric decoration.',parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.secondary","foreground.primary","foreground.secondary","foreground.muted","border.subtle","accent.primary","accent.secondary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.md","rounded.lg","rounded.xl","rounded.full"]},elevation:{source:"elevation",keys:["shadow.lg"]},decorativeImagery:{source:"imagery.decorative",options:["Storybook Character Illustrations","Confetti Sparkle Marks"]}}},"Inline Friendly":{content:`Handwritten Inline Friendly\r
\r
### Identity\r
A single word in the headline is set in a contrasting handwritten script — "doing" rendered in an expressive cursive style while the surrounding headline uses a high-contrast display weight — creating an inline typographic collision that is the design's entire personality. This is not a decorative element alongside the text; it is embedded within the sentence itself, disrupting and humanizing a single word. Remove it and the page becomes a forgettable clean SaaS layout. Every other choice — the rounded pill nav, the warm \`surface.secondary\` announcement badge, the friendly product mockups — exists to support and match the warmth this one typographic gesture establishes.\r
\r
### Composition\r
Strictly centered single-column for the hero: announcement pill → headline → subtitle → CTA → product mockup. The product mockup section breaks to a two-panel side-by-side layout labeled "Your notes + transcript" and "AI enhanced," showing the before/after transformation at equal scale. Below, a centered large headline introduces a horizontally scrolling row of client logo tiles. Visual weight is symmetrically centered throughout with no left or right gravitational pull.\r
\r
### Spatial Density\r
Sparse. The hero text zone contains minimal elements with generous whitespace between each. The product mockup panels are content-rich internally but sit with abundant empty space surrounding them. The client logo row uses equally-sized tiles with visible gaps. On smaller formats, preserve whitespace by showing the product panels stacked rather than side-by-side; never compress elements to fill freed space.\r
\r
### Scale Contrast\r
High for the hero — the main headline runs approximately 5–6x the subtitle Body text, making it clearly dominant. Within the headline itself, the handwritten word introduces a third typographic register purely through style contrast rather than scale — it runs at roughly the same size as its surrounding words but reads as categorically different. No extreme scale contrast elsewhere; sections below the hero use a large centered headline at 3–4x Body, then the logo tiles at label scale.\r
\r
### Edge Behavior\r
All content sits within a tight centered max-width container with generous lateral margins — nothing approaches the viewport edge. The product mockup panels float centered with visible margin on all sides. The client logo row tiles extend close to but do not reach the viewport edge. The floating video call thumbnail on the left product panel crops partially outside its parent card boundary — the only edge-breaking gesture on the page, and deliberately casual in feel.\r
\r
### Separation\r
Whitespace alone separates all sections. The product mockups use \`shadow.sm\` elevation to lift them as distinct objects on \`surface.primary\`. Client logo tiles use \`border.subtle\` as card outlines, with gap space between tiles. The nav bar floats as a pill-shaped contained bar with \`border.subtle\` outline rather than spanning the full page width — it is itself a contained object. No rules, no color cuts, no background shifts between sections.\r
\r
### Typography\r
The Headings category carries the hero headline and the social proof section headline at high scale — the dominant display register uses high-contrast weight with generous natural line-height. The Body category handles the subtitle and product mockup content at comfortable reading size. The Captions category carries the announcement pill label, the "Your notes + transcript" and "AI enhanced" labels above the mockup panels, nav links, and the "AI enhanced" sparkle-prefixed eyebrow — small and light. The inline handwritten script word is a decorative Headings treatment, not a separate font category — it is an expressive variant applied to one token within the headline.\r
\r
### Shape\r
\`rounded.full\` dominates: the nav bar container, the announcement pill badge, the primary CTA button, and the "AI enhanced" eyebrow tag are all pill-shaped. \`rounded.xl\` for the product mockup card containers. \`rounded.lg\` for the client logo tiles. \`rounded.md\` for elements within the product UI mockups. \`rounded.none\` appears nowhere — every element on the page is softened, making this the second design in the set with zero sharp corners.\r
\r
### Color Rules\r
\`surface.primary\` is a clean near-white holding across all sections. \`surface.secondary\` is a warm muted tint used for the announcement pill badge — the only non-white surface on the page aside from product mockup interiors. \`accent.primary\` (a saturated forest green) is used for the primary CTA button fill and the small sparkle icon before "AI enhanced" — appearing exactly twice, both times on direct action or feature-highlight elements. \`foreground.muted\` handles nav links, subtitle text, and client logo marks. No \`surface.inverse\` zone; the page never goes dark. The palette is maximally restrained: one accent, two surfaces, done.\r
\r
### Decoration\r
The inline handwritten script word embedded in the headline is the primary and most distinctive decorative element — it is typographic decoration inseparable from content. A small sparkle/star glyph prefixes the "AI enhanced" label. The floating video call thumbnail (two participant faces) cropped at the edge of the left mockup panel adds a human, candid quality. No photography as decoration, no illustrations, no mesh gradients, no abstract shapes.`,parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.secondary","foreground.primary","foreground.secondary","foreground.muted","border.subtle","accent.primary"]},roundness:{source:"roundness",keys:["rounded.md","rounded.lg","rounded.xl","rounded.full"]},elevation:{source:"elevation",keys:["shadow.sm"]}}},"Monumental Editorial":{content:`Monumental Editorial Bleed\r
\r
### Identity\r
Viewport-filling display typography — uppercase headlines so large they bleed off both left and right edges simultaneously — is the cornerstone of the design. "FORM FOLLOWS FEELING" spans the full width and crops at both sides, creating the sensation that the type is bigger than the page itself. This bleeding, edge-breaking typographic gesture is non-negotiable; it transforms text into architecture. The full-bleed hero photograph beneath it exists as a textured stage, but the type is the event.\r
\r
### Composition\r
Two distinct compositional modes alternate through the page. The hero is a full-bleed photographic slab with typography layered on top — text floats at multiple vertical positions across the image simultaneously (top-left caption, center body quote, top-right nav link, bottom edge-bleeding headline). Below, the layout shifts to a sparse three-column editorial grid: a short left-column label, a centered body text block, and a right-column link — with a single small photograph placed off-center to the right of middle. Visual weight in the hero is bottom-heavy, pulled down by the massive baseline-anchored headline.\r
\r
### Spatial Density\r
Extremely sparse below the fold. The "EMPATHY SHAPES EVERYTHING" section is an enormous uppercase headline on a white ground with nothing else — the entire viewport is headline and void. The three-column editorial section contains a small photograph, two short paragraphs, and two labels across the full width, leaving the majority of the surface empty. On smaller formats, preserve the emptiness: show one element per screen, never compress multiple zones together.\r
\r
### Scale Contrast\r
Extreme. The bleeding display headline runs 8–10x the size of body text — it is not a headline in the conventional sense but a typographic object at architectural scale. The "EMPATHY SHAPES EVERYTHING" section headline also runs at near-full-viewport-width, maintaining extreme scale even off the photograph. Body text is deliberately small and refined. No mid-scale exists — the design operates at two extremes only: monumental display and quiet body.\r
\r
### Edge Behavior\r
Large typographic elements are the defining rule: they bleed past the viewport boundary on both sides, cropping against the edges with zero margin. This is the design's most distinctive spatial gesture and must be preserved wherever display headlines appear. Small elements — captions, nav links, body text, the small interior photograph — all float inward with generous margins, never touching edges. The contrast between bleeding type and inset small elements creates the page's sense of scale.\r
\r
### Separation\r
Whitespace alone creates all separation — between the hero photograph zone and the headline zone, between sections, between the three editorial columns. No border strokes, no rules, no color-cut dividers anywhere. The transition from photograph to white ground is a hard cut with no gradient or fade. No shadows, no elevation — the design is entirely flat.\r
\r
### Typography\r
The Headings category carries all display headlines at extreme scale — uppercase with tight, compressed line-height so stacked lines feel like a single monolithic slab. The Body category handles all running text in two modes: a mid-size centered quote overlaid on the photograph (slightly elevated weight), and small refined paragraphs in the editorial grid below. The Captions category carries all navigation labels, section identifiers ("About", "Approach →"), and column labels ("Interior design for hospitality") — small, light-weight, and widely spaced. Hierarchy is built from the extreme size gulf between Headings and everything else; weight plays a secondary role.\r
\r
### Shape\r
\`rounded.none\` everywhere without exception. Every element — the small interior photograph, any containers, all typographic blocks — is strictly rectangular. No softness of any kind; the design's authority depends on absolute angularity.\r
\r
### Color Rules\r
Strictly two surface states: \`surface.primary\` (white) for all off-photograph sections, and the photograph itself serving as a textured \`surface.inverse\`-equivalent in the hero. All type on the photograph uses \`foreground.inverse\` (white). All type below uses \`foreground.primary\` (near-black). No accent colors anywhere — no buttons, no highlights, no colored links. Navigation arrows (\`→\`) are the only non-typographic marks and they carry no color distinction. The palette is monochrome absolute.\r
\r
### Decoration\r
High-quality interior design photography — luxurious hospitality spaces with warm ambient lighting — is the sole decorative layer, used full-bleed in the hero and as a single small inset image in the editorial section. No illustration, no gradients, no abstract marks, no icons. Typography at architectural scale takes decoration's place.`,parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","foreground.primary","foreground.secondary","foreground.inverse"]},roundness:{source:"roundness",keys:["rounded.none"]},decorativeImagery:{source:"imagery.decorative",options:["Hospitality Interior Photography"]}}},"Product Demo":{content:"Product Demo Dominant\r\n\r\n### Identity\r\nA full-scale, floating product UI screenshot — a dense, realistic data table with a sidebar, column headers, and live-looking contact records — is the centerpiece of the page and the design's primary argument. The product is the hero; the headline exists to label it, not to precede it. Every other section either supports this product-forward stance (the integration constellation diagram, the stat row) or provides narrative context between demonstrations. Remove the product mockup and the design loses its reason for existing.\r\n\r\n### Composition\r\nSingle-column, centered, stacked full-width sections with a narrow content container and generous lateral margins. The product mockup breaks slightly wider than the text column, creating a subtle zoom moment. The integration diagram section uses a dark `surface.inverse` rounded block inset from the page edges as a self-contained showcase panel. The stat row at the bottom uses a four-column equal-width grid. Visual weight is consistently centered — no left or right gravitational pull anywhere on the page.\r\n\r\n### Spatial Density\r\nSparse in text sections, dense inside product mockup zones. The hero text area contains a rating badge, a three-line headline, one body paragraph, two CTAs, and a trust note — all with room to breathe. The product table mockup is intentionally dense with rows and columns, communicating product maturity and data richness. On smaller formats, the text sections compress gracefully; the product mockup should scroll horizontally or scale down as a unit rather than reflowing its contents.\r\n\r\n### Scale Contrast\r\nModerate — approximately 3–4x between the hero Headings and Body text. The headline is prominent but not monumental; it serves a supporting role to the product screenshot rather than dominating the viewport. The stat figures (`5M+`, `3.1x`, `2.5hrs`, `12k`) run at approximately 4x their caption labels, creating a strong two-speed data display. No extreme scale contrast anywhere — the design's authority comes from product density, not typographic drama.\r\n\r\n### Edge Behavior\r\nAll content floats inward within a centered max-width container with consistent lateral margins. The product mockup and the integration panel extend slightly beyond the text column width but never reach the viewport edge. The integration panel uses `rounded.3xl` and sits as a contained island with clear margin on all sides — it does not bleed. The announcement bar at the very top is the only full-width flush element. Small elements (CTAs, badges, nav items) are inset with comfortable padding.\r\n\r\n### Separation\r\nWhitespace alone separates all sections — no horizontal rules, no color-cut borders between content zones. The `surface.inverse` integration panel creates a dark island that reads as a distinct section through color contrast alone, not through borders. The product mockup floats on `surface.primary` with `shadow.lg` providing the only elevation, lifting it clearly off the background. The data table uses `border.subtle` hairline rules between rows and columns internally.\r\n\r\n### Typography\r\nThe Headings category drives the hero headline and section headlines at moderate scale with natural line-height — clear and direct, never compressed or stylized. The Body category handles all descriptor paragraphs, table cell contents, and nav links at normal weight. The Captions category carries the eyebrow label (`PROBLEM → PROMISE`), the rating badge text, the \"No card required\" trust note, and stat figure labels — rendered in a small, muted register that frames without competing. The Data category drives the four stat figures at large display scale, each paired with a Captions label beneath.\r\n\r\n### Shape\r\n`rounded.lg` for CTA buttons, table badge chips, and small UI elements within the product mockup. `rounded.xl` for the product mockup container card and the integration panel's inner app icon cards. `rounded.3xl` for the integration panel itself — the largest, most prominent rounded container on the page. `rounded.full` for the primary filled CTA button and the announcement bar pill. `rounded.none` for the data table rows and the nav bar.\r\n\r\n### Color Rules\r\n`surface.primary` is a near-white page background. `surface.inverse` (deep dark) is used exclusively for the integration diagram panel — one dramatic zone of contrast on an otherwise light page. The announcement bar uses a gradient fill of `accent.primary` into `accent.secondary` — the only gradient instance, and the first thing seen on the page. `accent.primary` reappears in the primary CTA button and the central glow within the integration panel. `foreground.muted` handles social proof logos, caption labels, and the sidebar icon states. No surface shifts between text-only sections — `surface.primary` holds throughout.\r\n\r\n### Decoration\r\nThe integration constellation diagram — a centered brand icon surrounded by floating partner app logos connected by subtle dotted lines, set against a deep `surface.inverse` background with a radial glow emanating from the center — is the sole decorative set piece. Small emoji-style 3D icons accompany each stat figure. A gradient announcement bar at the very top uses `accent.primary`-to-`accent.secondary` as a thin decorative band. No photography, no mesh gradients in body sections, no abstract illustration.",parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},data:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.inverse","foreground.primary","foreground.secondary","foreground.muted","foreground.inverse","border.subtle","accent.primary","accent.secondary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.lg","rounded.xl","rounded.3xl","rounded.full"]},elevation:{source:"elevation",keys:["shadow.lg"]}}},"Soft Bento":{content:"Soft Bento Clinical\r\n\r\n### Identity\r\nA visible bento grid of rounded, tinted surface blocks is the structural and aesthetic cornerstone — the page is explicitly a set of containers, not a continuous scroll. Each block is a distinct `surface.secondary` tile with its own purpose: headline, UI demo, CTA, data stat, or list. Remove the tiled container system and the design becomes a generic column layout. The softness of the rounded corners and muted tinted surfaces signals clinical warmth rather than clinical coldness — approachability is the emotional mandate the grid must carry.\r\n\r\n### Composition\r\nA two-column bento grid dominates the hero and repeating content sections, with tiles of varying heights sitting side by side. Tiles do not share borders — gap space between them reveals `surface.primary` and gives each block breathing room. Visual weight is left-anchored: the primary message tile always occupies the left column, with supporting or demonstrative content in the right. Below the grid, single-column full-width text sections provide rhythm breaks between bento zones.\r\n\r\n### Spatial Density\r\nModerate. Each bento tile contains only one or two content types — a headline and body, or a UI mockup, or a stat pair — with generous internal padding. No tile is crowded. Between sections, substantial vertical whitespace separates each bento cluster from the next. On smaller formats, collapse the two-column grid to single-column stacked tiles; preserve internal tile padding — never compress tile contents to fit more tiles per screen.\r\n\r\n### Scale Contrast\r\nHigh within tiles, moderate across the page. Hero headlines run 4–5x Body size, creating strong dominance inside their tile. Data figures (`$2.5B+`, `11M+`) are displayed at a large scale — roughly 3x their caption labels — forming a clear two-speed stat hierarchy. The centered list of clinical terms (Eating Disorder, Detox, SUD) uses graduated scale contrast between items, with the middle item largest — an expressive typographic device unique to this list tile.\r\n\r\n### Edge Behavior\r\nAll tiles float inward from the viewport edge with a consistent outer margin — nothing bleeds to the browser boundary. Inside each tile, content is inset with generous padding; headlines and body text never press against tile edges. The UI mockup cards within the demo tile are themselves inset within their parent tile, creating a nested inset-within-inset containment. Small elements like pill-shaped category tags sit inset within their tiles and never approach tile boundaries.\r\n\r\n### Separation\r\nGap space between tiles — revealed `surface.primary` background — is the sole structural separator. No border strokes between tiles, no dividers within tiles, no rules between sections. Whitespace alone separates the logo bar, section headings, and text-only sections from adjacent bento clusters. No shadows on tiles; elevation (`shadow.sm`) appears only on the nested UI mockup cards within the demo tile, suggesting interactive product surfaces.\r\n\r\n### Typography\r\nThe Headings category carries hero headlines and section-opening statements at high scale with natural line-height — multi-line titles read as calm, considered statements. The Body category handles all descriptor paragraphs and nav links at normal weight and spacing. The Data category drives stat figures (`$2.5B+`, `11M+`) at large display scale, paired with small Captions labels beneath each figure. The Captions category also handles pill-shaped eyebrow tags (`Broad clinical support`, `The problem`) rendered in regular weight — not uppercase — relying on the pill container for visual distinction rather than letter-spacing.\r\n\r\n### Shape\r\n`rounded.2xl` for all bento tiles and the hero CTA block — the dominant container radius that establishes the design's soft character. `rounded.xl` for nested UI mockup cards within the demo tile. `rounded.full` for pill-shaped eyebrow tags, the nav CTA button, and the status badge (`Form complete`). `rounded.lg` for small inline buttons within the UI mockup. `rounded.none` appears nowhere — every element in the design is softened.\r\n\r\n### Color Rules\r\n`surface.primary` is the page background. `surface.secondary` fills all bento tiles in a muted tinted variant — tiles are the same tint family but some are deeper than others, with the CTA tile using `surface.inverse` (dark) as the sole high-contrast block on the page. `accent.primary` appears in the nav CTA button, the status badge fill within the demo tile, and the sparkline data visualization — used sparingly as a true highlight color. `foreground.muted` handles investor logo marks and caption labels. No secondary or tertiary accents; the palette is deliberately narrow.\r\n\r\n### Decoration\r\nUI product mockups — simplified representations of CRM, EHR, and RCM screens with patient data — serve as the primary non-typographic visual content, functioning as both decoration and product demonstration. A small sparkline chart within one mockup card is the only data visualization. No mesh gradients, no photography, no abstract illustration. The graduated-scale clinical terms list (Eating Disorder through PHP) is the single expressive typographic decoration.",parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},data:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.secondary","surface.inverse","foreground.primary","foreground.secondary","foreground.muted","foreground.inverse","accent.primary"]},roundness:{source:"roundness",keys:["rounded.lg","rounded.xl","rounded.2xl","rounded.full"]},elevation:{source:"elevation",keys:["shadow.sm"]}}},"Spatial Plus":{content:'Dark Hero Spatial Plus\r\n\r\n### Identity\r\nA single `accent.primary` plus-sign mark — small, precise, and repeated as the only decorative element across the entire page — is the design\'s typographic signature. It appears as a lone mark in the top-left corner of the hero, as an eyebrow prefix before section labels, and as a vertical column of five marks floating between photographs in the content section. This repeated minimal glyph creates visual rhythm and brand consistency without illustration, gradient, or pattern. Remove the plus marks and the design loses its personality entirely, collapsing into a generic dark-hero layout.\r\n\r\n### Composition\r\nThe hero is a `surface.inverse` rounded block — not a full-bleed photograph but a contained dark island sitting on `surface.primary` with visible margin on all sides. Inside it, content is left-anchored with the brand name at large display scale bottom-left, and a portrait photograph floating as a `rounded.xl` card in the upper-right quadrant. Below, the layout shifts to `surface.primary` with a centered large-scale statement paragraph, then a two-column asymmetric photo grid — a taller portrait image left, a wider landscape image right — with the plus-mark column floating between them as a vertical axis. Visual weight alternates between left-anchored (hero) and centered (statement section).\r\n\r\n### Spatial Density\r\nSparse. The hero contains a headline, brand name, one photograph card, and three small text labels — surrounded by significant dark void. The statement section is a single large paragraph centered in open white space. The photo grid section has two large images with a narrow gap column between them and minimal caption text below the left image. On smaller formats, preserve the void: stack elements with generous spacing rather than filling the freed space with additional content.\r\n\r\n### Scale Contrast\r\nHigh. The brand name "Resintoi™" runs at extreme display scale — approximately 6–7x the subtitle headline above it — creating a two-speed hero: the subtitle reads first as a human-scale sentence, then the brand name hits as a spatial event. The statement paragraph below uses a large mid-scale — approximately 3x Body — with a deliberate two-color split: `foreground.primary` for the first clause, `foreground.muted` for the continuation, creating a visual fade that directs reading pace. No mid-scale in the hero; the design operates at monumental and utility only.\r\n\r\n### Edge Behavior\r\nThe hero `surface.inverse` block floats inward with visible margin on all sides — it does not bleed to the viewport edge, which is unusual and intentional; the contained dark block reads as an object rather than a zone. The portrait photograph card within the hero floats inset within the dark block. Below the hero, the two-column photograph grid extends close to but not past the viewport edge, with modest outer margins. Small elements (caption text, eyebrow labels) are comfortably inset.\r\n\r\n### Separation\r\nThe rounded `surface.inverse` hero block creates section separation through color contrast alone — no rules, no borders. Below the hero, whitespace is the sole separator between sections. The scrolling logo bar uses visible gap spacing between brand names with no dividers. No shadows on layout sections; the portrait photograph card within the hero uses `shadow.md` to lift it off the dark background. `border.subtle` hairlines appear only inside the small "Contact Jessica" overlay card within the hero photograph.\r\n\r\n### Typography\r\nThe Headings category carries the brand name at extreme display scale with heavy weight and tight tracking — it reads as a wordmark-scale object. The Body category handles the subtitle headline above the brand name and all running paragraphs at comfortable weight. The Captions category carries the three right-aligned service labels in the hero (`CONSULTING`, `MARKETING`, `SUSTAINABILITY`) in small uppercase with wide letter-spacing, plus the eyebrow prefix (`+ WHAT WE DO`) and the bottom-left caption beneath the portrait. The two-tone statement paragraph — `foreground.primary` fading to `foreground.muted` mid-sentence — is a typographic device applied within the Body category, not a separate font.\r\n\r\n### Shape\r\n`rounded.2xl` for the hero `surface.inverse` container block — the largest and most prominent rounded container on the page. `rounded.xl` for the portrait photograph card within the hero and both content section photographs. `rounded.none` for the nav bar and all structural page containers. No `rounded.full` shapes anywhere; the design uses rounded containers as spatial objects, not as interactive UI affordances.\r\n\r\n### Color Rules\r\n`surface.primary` is the page background — a near-white warm ground. `surface.inverse` is used exclusively for the hero block, creating one deep dark zone as a contained object. `accent.primary` (a vivid green) appears only as the plus-sign marks and the eyebrow label prefix — never in buttons, never on surfaces, never as a fill. It functions purely as a punctuation color: small, precise, and charged with brand identity through repetition. `foreground.muted` is used for the faded second clause of the statement paragraph and the scrolling logo bar clients — deliberate desaturation as a reading device. No secondary or tertiary accents.\r\n\r\n### Decoration\r\nThe repeated `accent.primary` plus-sign glyph is the sole decorative element — appearing as a single mark in the hero corner, as a section label prefix, and as a vertical five-mark column between photographs. High-quality editorial portrait photography and landscape photography serve as the primary visual content in image zones. No illustrations, no mesh gradients, no abstract shapes. Decoration is achieved through glyph repetition and photographic quality alone.',parameters:{headings:{source:"fonts"},body:{source:"fonts"},captions:{source:"fonts"},colorPalette:{source:"colors",keys:["surface.primary","surface.inverse","foreground.primary","foreground.secondary","foreground.muted","foreground.inverse","border.subtle","accent.primary"]},roundness:{source:"roundness",keys:["rounded.none","rounded.xl","rounded.2xl"]},elevation:{source:"elevation",keys:["shadow.md"]},decorativeImagery:{source:"imagery.decorative",options:["Editorial Portrait Photography","Landscape Photography"]}}}},LV={"Carbon Frost":{"surface.primary":"#FFFFFF","surface.secondary":"#F7F8FA","surface.tertiary":"#EEF0F2","surface.inverse":"#0A0A0A","foreground.primary":"#1A1A1A","foreground.secondary":"#666666","foreground.muted":"#888888","foreground.inverse":"#FFFFFF","border.primary":"#1A1A1A","border.subtle":"#EEF0F2","accent.primary":"#4A9FD8","accent.secondary":"#0A0A0A","accent.tertiary":"#B3D9F0","status.success":"#5DA876","status.warning":"#D4956A","status.error":"#C96B6B","status.info":"#4A9FD8"},"Deep Space Neon":{"surface.primary":"#0A0A0AFF","surface.secondary":"#1A1A1AFF","surface.tertiary":"#27272AFF","surface.inverse":"#FFFFFFFF","foreground.primary":"#FFFFFFFF","foreground.secondary":"#A1A1AAFF","foreground.muted":"#71717AFF","foreground.inverse":"#0A0A0AFF","border.primary":"#27272AFF","border.subtle":"#1A1A1AFF","accent.primary":"#A855F7FF","accent.secondary":"#EC4899FF","accent.tertiary":"#06B6D4FF","status.success":"#22C55EFF","status.warning":"#EAB308FF","status.error":"#EF4444FF","status.info":"#3B82F6FF"},"Fern Journal":{"surface.primary":"#FFFFFF","surface.secondary":"#F4F5F5","surface.tertiary":"#F0F4F1","surface.inverse":"#1E3322","foreground.primary":"#1E3322","foreground.secondary":"#6B7B6B","foreground.muted":"#808A80","foreground.inverse":"#FFFFFF","border.primary":"#1E3322","border.subtle":"#F4F5F5","accent.primary":"#2D6B3F","accent.secondary":"#E85D45","accent.tertiary":"#D4A020","status.success":"#2D6B3F","status.warning":"#D4A020","status.error":"#E85D45","status.info":"#4A7A8A"},"Forest Sage":{"surface.primary":"#F5F3EEFF","surface.secondary":"#C8DBBCFF","surface.tertiary":"#D6E4E8FF","surface.inverse":"#1B3A28FF","foreground.primary":"#1B3A28FF","foreground.secondary":"#4A6B52FF","foreground.muted":"#7A9A80FF","foreground.inverse":"#FFFFFFFF","border.primary":"#1B3A28FF","border.subtle":"#D6DDD0FF","accent.primary":"#2D5E3AFF","accent.secondary":"#4A8C5EFF","accent.tertiary":"#A8CCAFFF","status.success":"#2D6B3FFF","status.warning":"#C4943AFF","status.error":"#C96B6BFF","status.info":"#4A7A8AFF"},"Heritage Warmth":{"surface.primary":"#F5F2E9FF","surface.secondary":"#E8E4D8FF","surface.tertiary":"#DCD8CBFF","surface.inverse":"#2D2926FF","foreground.primary":"#2D2926FF","foreground.secondary":"#5E5954FF","foreground.muted":"#8C8782FF","foreground.inverse":"#F5F2E9FF","border.primary":"#2D2926FF","border.subtle":"#DCD8CBFF","accent.primary":"#7D6B3DFF","accent.secondary":"#4A3F24FF","accent.tertiary":"#B5A682FF","status.success":"#4A6741FF","status.warning":"#A67C37FF","status.error":"#8B3A3AFF","status.info":"#4A5D76FF"},"Parchment Gold":{"surface.primary":"#F4F2EF","surface.secondary":"#1E1E1E","surface.tertiary":"#384F84","surface.inverse":"#1A1A1A","foreground.primary":"#1A1A1A","foreground.secondary":"#4A4A4A","foreground.muted":"#777777","foreground.inverse":"#FFFFFF","border.primary":"#E5E0D8","border.subtle":"#EEECE8","accent.primary":"#C8B496","accent.secondary":"#384F84","accent.tertiary":"#D4C4AA","status.success":"#5C7A64","status.warning":"#C8A060","status.error":"#8B4040","status.info":"#5B72A0"},"Tangerine Orbit":{"surface.primary":"#FFFFFFFF","surface.secondary":"#F7F8FAFF","surface.tertiary":"#EEF0F2FF","surface.inverse":"#0A0A0AFF","foreground.primary":"#1A1A1AFF","foreground.secondary":"#666666FF","foreground.muted":"#888888FF","foreground.inverse":"#FFFFFFFF","border.primary":"#E5E7EBFF","border.subtle":"#F3F4F6FF","accent.primary":"#FF5C00FF","accent.secondary":"#FF8533FF","accent.tertiary":"#FFB380FF","status.success":"#4CAF50FF","status.warning":"#F5A623FF","status.error":"#E53935FF","status.info":"#2196F3FF"},"Terminal Green":{"surface.primary":"#FFFFFF","surface.secondary":"#F5F5F5","surface.tertiary":"#EBEBEB","surface.inverse":"#000000","foreground.primary":"#000000","foreground.secondary":"#333333","foreground.muted":"#666666","foreground.inverse":"#FFFFFF","border.primary":"#000000","border.subtle":"#CCCCCC","accent.primary":"#00FF00","accent.secondary":"#000000","accent.tertiary":"#80FF80","status.success":"#00CC00","status.warning":"#CCCC00","status.error":"#CC2200","status.info":"#0088CC"},"Warm Concrete":{"surface.primary":"#E8E9EB","surface.secondary":"#C2956A","surface.tertiary":"#A38979","surface.inverse":"#1A1A1A","foreground.primary":"#1A1A1A","foreground.secondary":"#666666","foreground.muted":"#999999","foreground.inverse":"#FFFFFF","border.primary":"#1A1A1A","border.subtle":"#E0E0E0","accent.primary":"#8F5A3C","accent.secondary":"#C2956A","accent.tertiary":"#A38979","status.success":"#6B7A5E","status.warning":"#B5823A","status.error":"#8B4040","status.info":"#5A7A8F"},"Warm Linen":{"surface.primary":"#F3EBE2","surface.secondary":"#C5BEB6","surface.tertiary":"#C3DED8","surface.inverse":"#1A1A1A","foreground.primary":"#1A1A1A","foreground.secondary":"#3D3D3D","foreground.muted":"#6B6B6B","foreground.inverse":"#FFFFFF","border.primary":"#1A1A1A","border.subtle":"#C5BEB6","accent.primary":"#D4916E","accent.secondary":"#C4CFDE","accent.tertiary":"#D5DCBA","status.success":"#7DB09A","status.warning":"#C8965A","status.error":"#C27878","status.info":"#7A9BB5"}},Ule={"Basic Roundness":{"rounded.none":0,"rounded.xs":2,"rounded.sm":4,"rounded.md":6,"rounded.lg":8,"rounded.xl":12,"rounded.2xl":16,"rounded.3xl":24,"rounded.4xl":32,"rounded.full":9999}},Gle={"Gentle Lift":{"shadow.sm":[{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:1},blur:3}],"shadow.md":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:2},blur:4},{type:"shadow",shadowType:"outer",color:"#0000000d",offset:{x:0,y:6},blur:16}],"shadow.lg":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:4},blur:6},{type:"shadow",shadowType:"outer",color:"#00000012",offset:{x:0,y:16},blur:40}],"shadow.xl":[{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:8},blur:12},{type:"shadow",shadowType:"outer",color:"#00000018",offset:{x:0,y:28},blur:72}]},"Sharp Depth":{"shadow.sm":[{type:"shadow",shadowType:"outer",color:"#00000040",offset:{x:0,y:1},blur:2}],"shadow.md":[{type:"shadow",shadowType:"outer",color:"#00000080",offset:{x:0,y:4},blur:8}],"shadow.lg":[{type:"shadow",shadowType:"outer",color:"#000000B3",offset:{x:0,y:12},blur:24}],"shadow.xl":[{type:"shadow",shadowType:"outer",color:"#000000E6",offset:{x:0,y:24},blur:48}]},"Soft Cloud":{"shadow.sm":[{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:1},blur:2}],"shadow.md":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:1},blur:3},{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:4},blur:12}],"shadow.lg":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:2},blur:4},{type:"shadow",shadowType:"outer",color:"#0000000f",offset:{x:0,y:12},blur:32}],"shadow.xl":[{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:4},blur:8},{type:"shadow",shadowType:"outer",color:"#00000014",offset:{x:0,y:24},blur:64}]},"Soft Lift":{"shadow.sm":[{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:1},blur:2}],"shadow.md":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:1},blur:3},{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:4},blur:12}],"shadow.lg":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:1},blur:3},{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:8},blur:24}],"shadow.xl":[{type:"shadow",shadowType:"outer",color:"#00000008",offset:{x:0,y:1},blur:3},{type:"shadow",shadowType:"outer",color:"#0000000a",offset:{x:0,y:16},blur:48}]}},BV={"Abstract Chromatic Gradients":`### Abstract Chromatic Gradients\r
\r
Large-scale, flowing organic forms with a smooth, fabric-like quality — curved surfaces that fold and sweep as if rendered from translucent silk or petal-like sheets. Colors transition across 3–5 accent colors in a warm-to-cool spectrum, with each surface holding a distinct hue while softly blending into adjacent forms at overlap zones. The composition is always significantly larger than its container, with forms bleeding off multiple edges to imply infinite extension. Surfaces catch and reflect light directionally, giving a subtle three-dimensional luminosity without hard shadows or defined geometry.\r
\r
When generating: "abstract flowing chromatic gradient, large organic folding forms, silk-like translucent surfaces, warm-to-cool color sweep, [accent colors], soft directional light, 3D luminosity, smooth curves, cropped at frame edges, photographic scale, no text, no objects, no geometry"`,"Abstract Tangerine Swirls":'### Abstract Tangerine Swirls\r\n\r\nLarge-scale, fluid organic forms with a high-gloss, liquid-like quality — curved surfaces that twist and loop as if rendered from molten glass or thick paint. Colors transition across `accent.primary` and `accent.secondary` in a vibrant orange spectrum, with deep shadows and bright highlights creating a strong sense of three-dimensional volume. The composition is always larger than its container, with forms bleeding off edges to create a sense of continuous motion.\r\n\r\nWhen generating: "abstract flowing liquid forms, high-gloss orange swirls, molten glass texture, vibrant orange spectrum, [accent.primary] and [accent.secondary], dramatic studio lighting, deep shadows and bright highlights, cropped at frame edges, no text, no objects"',"Aerial Photography":`### Aerial Photography\r
\r
Large-scale aerial photography showing terrain, coastlines, cities, or water systems from above. Favor expansive compositions with strong geometry, visible environmental texture, and enough negative space to support overlaid UI or typography. The image should feel structural rather than scenic, with a calm, survey-like perspective.\r
\r
When generating: "high-quality aerial photography, top-down or high oblique view, expansive terrain or city geometry, cinematic scale, clear structure, subtle atmospheric depth, room for overlay text, no visible text, editorial quality"`,"Architectural Hand Illustrations":`### Architectural Hand Illustrations\r
\r
Hand-rendered architectural drawings or line illustrations with an editorial, crafted feel. Use delicate linework, warm material cues, and restrained detail so the illustration reads as a refined inset visual rather than a cartoon. The overall tone should suggest craftsmanship, place, and human touch.\r
\r
When generating: "editorial architectural hand illustration, refined line drawing, warm materials, subtle shading, crafted lifestyle brand feel, elegant composition, no labels, no blueprint grid, high-end magazine aesthetic"`,"Atmospheric Landscape Photography":`### Atmospheric Landscape Photography\r
\r
Moody landscape photography with visible atmosphere such as fog, mist, overcast light, or distant haze. Favor cinematic depth, soft contrast transitions, and a sense of scale that can carry a hero section without becoming busy. The image should feel contemplative and slightly dramatic.\r
\r
When generating: "cinematic atmospheric landscape photography, misty hills or open terrain, overcast natural light, soft haze, dramatic depth, quiet mood, editorial quality, no text, spacious composition"`,"Cartographic Grid Overlay":`### Cartographic Grid Overlay\r
\r
Thin technical grid lines, contour hints, coordinates, or surveying marks used as a low-noise overlay on top of imagery. Keep it precise and understated so it adds analytical structure without becoming a dominant pattern. The overlay should feel like map annotation or navigation instrumentation.\r
\r
When generating: "subtle cartographic grid overlay, thin technical linework, contour hints, survey coordinates, low opacity, precise map annotation feel, no labels, minimal and elegant"`,"Confetti Sparkle Marks":`### Confetti Sparkle Marks\r
\r
Small celebratory accent marks such as sparkles, tiny stars, dots, and confetti flecks used sparingly around key moments. They should feel playful and lightweight, never dense enough to become a background texture. Use them to add warmth and delight around illustrations or CTAs.\r
\r
When generating: "small sparkle and confetti accent marks, playful editorial embellishments, warm friendly tone, sparse placement, tiny stars and dots, clean background, no text"`,"Editorial Portrait Photography":`### Editorial Portrait Photography\r
\r
High-quality portrait photography with an editorial fashion or magazine sensibility. Favor confident composition, clear subject separation, and controlled lighting that feels elevated rather than casual. The portrait should read as a strong design element with enough simplicity around the subject for overlay use.\r
\r
When generating: "editorial portrait photography, magazine-quality composition, refined lighting, strong subject presence, clean background or minimal environment, premium tone, no text"`,"Fluid Ribbon Gradients":`### Fluid Ribbon Gradients\r
\r
Large-scale, sweeping ribbon-like forms rendered as layered translucent color bands that curve and arc in smooth, continuous motions. Colors blend across a range of 3–4 accent colors at high saturation and opacity so individual bands remain visually distinct while dissolving softly into one another at their edges. The ribbon assembly is always rendered at a scale significantly larger than its container — forms bleed off multiple edges, implying a much larger composition existing beyond the frame. Always sits behind all text and UI elements with no intrusion into foreground content.\r
\r
When generating: "abstract fluid ribbon gradient, large sweeping arc color bands, layered translucent forms blending at edges, [accent colors], smooth curves, high saturation, cropped at frame edges, photographic scale, no text, no objects, no geometry"`,"Heritage Atmosphere":`### Heritage Atmosphere\r
\r
Atmospheric photography capturing architectural details, natural materials, or lifestyle scenes that evoke a sense of history, craftsmanship, and quiet luxury. The imagery often features warm, natural lighting, soft focus in the background, and a rich, organic texture. Compositions are often full-bleed or large-scale, serving to set a mood rather than convey specific information.\r
\r
When generating: "heritage-inspired atmospheric photography, [subject: architectural detail/natural material/lifestyle scene], warm natural lighting, organic textures, soft focus background, quiet luxury mood, [accent colors], no text, high-end editorial style"`,"Hospitality Interior Photography":`### Hospitality Interior Photography\r
\r
Architectural interior photography of hospitality spaces such as lounges, hotel lobbies, restaurants, or refined communal environments. Emphasize material richness, spatial depth, and a composed, design-forward point of view. The image should feel immersive and quietly luxurious.\r
\r
When generating: "high-end hospitality interior photography, architectural composition, warm materials, quiet luxury, spacious room depth, editorial lighting, no people required, no text"`,"Landscape Photography":`### Landscape Photography\r
\r
Wide, high-quality landscape photography used as a large-format stage image. Favor strong horizon control, clear foreground-to-background depth, and enough visual calm to support overlays. The image should feel expansive and atmospheric, not busy or snapshot-like.\r
\r
When generating: "editorial landscape photography, wide scenic composition, cinematic depth, calm but dramatic natural environment, spacious framing, room for overlaid text, no text in image"`,"Lifestyle Workspace Photography":`### Lifestyle Workspace Photography\r
\r
Warm lifestyle photography of people or spaces in a creative or professional work setting. Favor natural light, tactile materials, and a relaxed editorial framing that suggests focus, comfort, and human presence. The image should feel lived-in and aspirational without becoming staged stock-photo cliche.\r
\r
When generating: "warm lifestyle workspace photography, creative professional environment, natural light, tactile materials, relaxed editorial framing, human-centered but refined, no text"`,"Neon Mesh Gradients":'### Neon Mesh Gradients\r\n\r\nLarge-scale, organic mesh gradients that blend deep purples and vibrant pinks from the `accent.primary` and `accent.secondary` tokens. The gradients are rendered with a soft, cloud-like texture, creating a sense of depth and atmosphere behind the UI. They are always larger than their container, bleeding off the edges to feel like a slice of a larger cosmic field. The gradients never compete with text, maintaining high contrast with `foreground.primary`.\r\n\r\nWhen generating: "abstract organic mesh gradient, deep purple and neon pink, [accent.primary] and [accent.secondary], soft cloud-like texture, large scale, cropped at frame edges, dark background, no text, no objects"',"Ornamental Brand Icon":`### Ornamental Brand Icon\r
\r
Small ornamental emblem or brand mark used as a refined decorative motif between sections. Favor symmetrical or heritage-inspired geometry with a handcrafted feeling. It should read like a tasteful iconographic accent, not a modern app icon.\r
\r
When generating: "ornamental brand emblem, heritage-inspired icon, refined symmetrical mark, handcrafted elegance, minimal single-icon composition, no text, editorial brand accent"`,"Storybook Character Illustrations":`### Storybook Character Illustrations\r
\r
Warm hand-drawn character illustrations with a soft storybook quality. Use approachable shapes, gentle texture, and expressive but simple poses so the illustration adds personality without overwhelming product content. The tone should feel caring, playful, and premium rather than childish.\r
\r
When generating: "storybook-style character illustration, warm hand-drawn feel, soft texture, approachable shapes, playful but refined, editorial product companion art, no text"`,"Technical Construction Overlay":`### Technical Construction Overlay\r
\r
Lightweight technical annotation graphics such as arcs, measurement guides, construction lines, and diagram marks layered over a primary image. Keep the marks sparse and intentional so they read as analytical augmentation rather than engineering clutter. The effect should feel like a scientific or design study overlay.\r
\r
When generating: "technical construction overlay, thin arcs and guide lines, diagram annotation marks, low opacity, precise scientific study feel, sparse composition, no labels, no heavy grid"`},Gwt=["Anton","Funnel Sans","Geist","Geist Mono","IBM Plex Mono","Inter","Newsreader","Playfair Display"],rZ={fonts:{options:Gwt},colors:{options:Object.keys(LV),presets:LV},roundness:{options:Object.keys(Ule),presets:Ule},elevation:{options:Object.keys(Gle),presets:Gle},"imagery.decorative":{options:Object.keys(BV)}};
function iZ(t){const e=rZ[t.source];return e?t.options?e.options.filter(n=>t.options.includes(n)):e.options:[]}
function Hwt(t){const e={};if(t.parameters)for(const[n,r]of Object.entries(t.parameters))e[n]={source:r.source,options:iZ(r)};return e}
function Vwt(t,e){const n={...e};for(const[r,i]of Object.entries(t)){if(n[r])continue;const o=iZ(i);o.length===1&&(n[r]=o[0])}return n}
function qwt(t,e){const n=new Set(Object.keys(t));for(const r of Object.keys(e))if(!n.has(r))throw new Error(`Unknown param: "${r}". Valid params: ${[...n].join(", ")}`);for(const[r,i]of Object.entries(t)){const o=e[r];if(o==null)continue;const s=iZ(i);if(s.length>0&&!s.includes(o))throw new Error(`Invalid value "${o}" for param "${r}". Valid values: ${s.join(", ")}`)}}
function Wwt(t,e){var s;const n=[t.content,""];if(!t.parameters)return n.join(`
`).trim();qwt(t.parameters,e);const r=Vwt(t.parameters,e),i=[],o={};for(const[a,l]of Object.entries(t.parameters))if(l.source==="fonts")i.push(a);else if(l.source==="imagery.decorative"){const c=r[a];c&&BV[c]&&n.push(`## ${a}`,"",BV[c],"")}else(s=rZ[l.source])!=null&&s.presets&&(o[l.source]||(o[l.source]={label:a,keys:[]}),l.keys&&o[l.source].keys.push(...l.keys));if(i.length>0){let a=!1;for(const l of i){const c=r[l];c&&(a||(n.push("## Typography",""),a=!0),n.push(`${l}: ${c}`))}a&&n.push("")}for(const[a,l]of Object.entries(o))$wt(a,l.label,l.keys,r,n);return n.join(`
`).trim()}
function $wt(t,e,n,r,i){var c;const o=(c=rZ[t])==null?void 0:c.presets;if(!o)return;const s=r[e];if(!s)return;const a=o[s];if(!a)return;const l=[];for(const u of n){const d=a[u];d!=null&&Ywt(l,u,d)}if(l.length>0){i.push(`## ${e}`,"","```yaml");for(const u of l)i.push(u);i.push("```","")}}
function Ywt(t,e,n){if(typeof n=="string"){t.push(`${e}: "${n}"`);return}if(typeof n=="number"){t.push(`${e}: ${n}`);return}if(Array.isArray(n)){t.push(`${e}:`);for(const r of n)t.push(`  - { ${Xwt(r)} }`)}}
function Xwt(t){return Object.entries(t).map(([e,n])=>Kwt(e,n)).join(", ")}
function Kwt(t,e){if(typeof e=="object"&&e!==null){const n=Object.entries(e).map(([r,i])=>`${r}: ${i}`).join(", ");return`${t}: { ${n} }`}return typeof e=="string"?`${t}: "${e}"`:`${t}: ${e}`}
function Hle(t,e){const n=[`## ${t}`,""];for(const[r,i]of Object.entries(e)){let o=`- "${r}"`;i.description&&(o+=`: ${i.description}`),n.push(o)}return n.join(`
`)}
function ext(t){const e=["## Required params","","Pass these as `params: { key: value }` to get the instantiated style.",""],n=[];let r;for(const[i,o]of Object.entries(t)){if(o.source==="fonts"){n.push(i),r=o.options;continue}e.push(`"${i}":`);for(const s of o.options)e.push(`  - ${s}`);e.push("")}if(n.length>0&&r){e.push(`${n.map(i=>`"${i}"`).join(", ")} (each one of):`);for(const i of r)e.push(`  - ${i}`);e.push("")}return e.join(`
`)}
function txt(t){if(!t.category)return`# Available Guidelines

${Object.values(FV).map(i=>Hle(i.heading,i.templates)).join(`

`)}`;const e=FV[t.category];if(!e)throw new Error(`Unknown category: "${t.category}". Valid categories: ${Qwt.join(", ")}`);if(!t.name)return`# Available Guidelines

${Hle(e.heading,e.templates)}`;const n=e.templates[t.name];if(!n)throw new Error(`Unknown ${t.category}: "${t.name}". Valid names: ${Object.keys(e.templates).join(", ")}`);return!t.params&&n.parameters?ext(Hwt(n)):Wwt(n,t.params??{})}
function nxt(){return`${jwt}

${Jwt}

${Zwt}`}
function rxt(t,e,n,r){const i=[...e.selectionManager.selectedNodes],o=e.scenegraph.getViewportNode().children,s=o.length,a=[],l=u=>{u.reusable&&a.push({id:u.id,name:u.properties.name});for(const d of u.children)l(d)};for(const u of e.documentManager.documents.values())u.isValid()&&l(u.root);let c="";if(i.length>0)c=`# Current Editor State 

## Selected Elements:
${i.map(u=>`- \`${u.id}\` (${u.type})${u.properties.name?`: ${u.properties.name}`:""}`).join(`
`)}`;else if(c=`## Document State:
`,c+=`- No nodes are selected.
`,s===0)c+=`- The document is empty (no top-level nodes).
`;else{const d=[],h=[];for(const g of o){const b={id:g.id,name:g.properties.name||g.id,type:g.type};e.camera.overlapsBounds(g.getWorldBounds())?d.push(b):h.push(b)}c+=`

### Top-Level Nodes (${s}):
`;const p=Math.min(10,s);for(let g=0;g<p;g++){const b=g<d.length?d[g]:h[g-d.length],v=g<d.length?"user visible":"outside viewport";c+=`
- \`${b.id}\` (${b.type}): ${b.name} [${v}]`}s>10&&(c+=`
- ... +${s-10} others`)}if(c+=`

### Reusable Components (${a.length}):
`,a.length>0?c+=a.map(u=>`- \`${u.id}\`${u.name?`: ${u.name}`:""}`).join(`
`):c+="- No reusable components found.",c=t?`## Currently active editor
- \`${zu(t)}\`

${c}`:c,r){const u=nxt();u&&(c+=`

${u}`)}return c}
function c4e(t){return{variables:YX([...t.variableManager.variables.values()])??{},themes:XX(t.variableManager.themes)}}
function u4e({sceneManager:t,agentId:e,maxDepth:n,parentId:r,problemsOnly:i}){const o=r?t.scenegraph.getNodeByPath(r):t.scenegraph.getViewportNode();if(!o)throw new Error(`Failed to find a node with id ${r}`);const s=(l,c,u)=>{const d=l.getTransformedLocalBounds(),h={id:l.path,x:d.x,y:d.y,width:d.width,height:d.height},p=l.parent;return p&&!p.isRoot&&!p.includesNode(l)&&(h.problems=p.overlapsNode(l)?"partially clipped":"fully clipped"),l.properties.resolved.rotation&&(h.rotation=jx(l.properties.resolved.rotation)),l.children.length!==0&&(c===void 0||c>0?h.children=l.children.map(g=>s(g,c&&c-1,u)).filter(Boolean):h.children="..."),u&&!h.problems&&(c===0||(h.children??[]).length===0)?void 0:h};for(const l of o.children)t.skiaRenderer.addFlash({node:l,agentId:e,longHold:!0});let a;return o.isRoot?(a=o.children.map(l=>s(l,n,i)).filter(Boolean),i&&a.length===0&&(a="No layout problems.")):(a=s(o,n,i),i&&!a&&(a="No layout problems.")),a}
function Vle(){return{success:!0,result:{message:"Extra agents spawned successfully. Your work is now to finish the last part of the split work. The other agents will finish the rest of the work, DO NOT verify their design!"},error:""}}
class ixt{constructor(e){Z(this,"sceneManager");Z(this,"processedToolCallIds");this.sceneManager=e,this.processedToolCallIds=new Set}async process({input:e,chatManager:n}){var r;if(e.partial)this.processedToolCallIds.add(e.id);else if(this.processedToolCallIds.has(e.id))return this.processedToolCallIds.delete(e.id),Vle();for(const i of e.agentsConfig){const o=[];let s;if(i.containerNodes&&i.containerNodes.length>0){const l=l4e({sceneManager:this.sceneManager,nodeIds:i.containerNodes,readDepth:3,includePathGeometry:!1,resolveInstances:!1,resolveVariables:!1});s=`Tool result of \`batch_get\` for nodes with IDs \`${i.containerNodes.join("`, `")}\` with \`read_depth\`: 3:
Calling \`batch_get\` for these nodes is not necessary anymore.

\`\`\` json
${JSON.stringify(l)}
\`\`\`

`;for(const c of i.containerNodes){const u=u4e({sceneManager:this.sceneManager,maxDepth:1,parentId:c});s+=`Tool result of \`snapshot_layout\` for node with ID \`${c}\` with \`maxDepth\`: 1:
Calling \`snapshot_layout\` for this node is not necessary anymore.

\`\`\` json
${JSON.stringify(u)}
\`\`\`
`}}o.push({name:"get_variables",content:`Tool result of \`get_variables\`. Calling \`get_variables\` is not necessary anymore.

${JSON.stringify(c4e(this.sceneManager))}`});const a=`${(r=i.containerNodes)!=null&&r.length?`Create the following design task in the \`${i.containerNodes.join("`, `")}\` nodes.`:""}

  Task:
  ${i.prompt}`;n==null||n.sendMessage({prompt:a,subagent:!0,files:o.map(l=>({type:"text",name:l.name,content:l.content,hidden:!0})),parentConversationId:e.conversationId,userMessageExtension:s})}return Vle()}}
class oxt extends Ma{constructor(){super(...arguments);Z(this,"_initialized",!1);Z(this,"_sceneManager");Z(this,"fileURI");Z(this,"_chatManager")}get initialized(){return this._initialized}get sceneManager(){return this._sceneManager}get chatManager(){return this._chatManager}setInput(n){this._sceneManager&&this._sceneManager.setInput(n)}setFileURI(n){this.fileURI=n}async setup({canvas:n,containerBounds:r,colorScheme:i,ipc:o,sendAPIRequest:s,pixiManager:a,canvasKitConfig:l,config:c,errorReportCallback:u,toastCallback:d,storage:h,supportChat:p,confirmNewImport:g,reportRejectedUpdates:b,isFeatureEnabled:v}){Kyt(u),Wgt(d),await hUe(l),p&&h&&(this._chatManager=new kbt(o,h)),this._sceneManager=new Gvt(n,r,i,a,o,c,(k,A)=>{this.emit("telemetry",{name:k,args:A})},this._chatManager,g,b,v??(()=>!1));const w=this._sceneManager.skiaRenderer.fontManager.fallbackFontLibrary.matchFont("Noto Sans",400,!1);w&&this._sceneManager.skiaRenderer.fontManager.loadFont(w),await this._sceneManager.skiaRenderer.fontManager.waitForAllFontsLoaded(),this._sceneManager.requestFrame(),await this.initializeIPC(o,s),this._sceneManager.eventEmitter.on("didChangeCursor",k=>{this.emit("did-change-cursor",k)}),this._initialized=!0}onDidResizeContainer(n){!this.initialized||!this.sceneManager||this.sceneManager.onDidResizeContainer(n)}async initializeIPC(n,r){if(!this._sceneManager)throw new Error("Editor not yet set up");const i=this._sceneManager,o=new Owt(i,r),s=new ixt(i);n.handle("save",a=>i.saveDocument(Gg.from(a))),n.handle("batch-design",async a=>{if(i.scenegraph.isReadonly)return{success:!1,error:`The document '${i.scenegraph.documentURI&&zu(i.scenegraph.documentURI)}' is read-only`};const l=!a.id||a.id===""?`tool-use-${Date.now()}`:a.id,c=await o.process(n,a.partial,a.operations,a.conversationId,l);return c?(c.success?(this.emit("telemetry",{name:"batch-design"}),this.emit("did-batch-design")):this.emit("telemetry",{name:"batch-design-failed",args:{error:c.message}}),{success:c.success,result:{message:c.success?c.message:""},error:c.success?"":c.message}):{success:!1,error:""}}),n.handle("permission-request",async a=>this._chatManager?{result:await this._chatManager.requestPermission(a.conversationId,a.toolName,a.input)}:{result:"deny"}),n.handle("spawn-agents",async a=>{this.emit("telemetry",{name:"spawn-agents"});try{return await s.process({input:a,chatManager:this.chatManager})}catch(l){return this.emit("telemetry",{name:"spawn-agents-failed",args:{error:l}}),{success:!1,error:l instanceof Error?l.message:"Failed to execute spawn-agents!"}}}),n.handle("batch-get",a=>{const{patterns:l,parentId:c,searchDepth:u,nodeIds:d,readDepth:h,includePathGeometry:p,resolveInstances:g,resolveVariables:b,conversationId:v}=a;this.emit("telemetry",{name:"batch-get"});try{return{success:!0,error:"",result:{nodes:l4e({sceneManager:i,agentId:v,patterns:l,parentId:c,searchDepth:u,nodeIds:d,readDepth:h,includePathGeometry:p,resolveInstances:g,resolveVariables:b})}}}catch(w){return this.emit("telemetry",{name:"batch-get-failed",args:{error:w}}),{success:!1,error:w instanceof Error?w.message:"Failed to search for nodes!",result:null}}}),n.handle("search-all-unique-properties",a=>{this.emit("telemetry",{name:"search-all-unique-properties"});try{const l=[];for(const u of a.parents){const d=i.scenegraph.getNodeByPath(u);if(!d)throw new Error(`Failed to find a node with id ${u}`);if(d.isRoot)for(const h of d.children)i.skiaRenderer.addFlash({node:h,agentId:a.conversationId,longHold:!0});else i.skiaRenderer.addFlash({node:d,agentId:a.conversationId,longHold:!0});l.push(d)}return{result:i.scenegraph.searchUniqueProperties(l,a.properties),success:!0,error:""}}catch(l){return this.emit("telemetry",{name:"search-all-unique-properties-failed",args:{error:l}}),{success:!1,error:l instanceof Error?l.message:"Failed to find unique properties!"}}}),n.handle("replace-all-matching-properties",a=>{if(this.emit("telemetry",{name:"replace-all-matching-properties"}),i.scenegraph.isReadonly)return{success:!1,error:`The document '${i.scenegraph.documentURI&&zu(i.scenegraph.documentURI)}' is read-only`};const l=i.scenegraph.beginUpdate();try{const c=[];for(const u of a.parents){const d=i.scenegraph.getNodeByPath(u);if(!d)throw new Error(`Failed to find a node with id ${u}`);const h=i.documentManager.getDocumentForNode(d);if(h!=null&&h.id)throw new Error(`Cannot make changes to node with id ${d.id}, because it's an imported node from ${zu(h.uri)}`);i.skiaRenderer.addFlash({node:d,agentId:a.conversationId}),c.push(d)}return i.scenegraph.replaceProperties(l,c,a.properties),{success:!0,error:""}}catch(c){return this.emit("telemetry",{name:"replace-all-matching-properties-failed",args:{error:c}}),{success:!1,error:c instanceof Error?c.message:"Failed to replace all matching properties!"}}finally{i.scenegraph.commitBlock(l,{undo:!0})}}),n.handle("find-empty-space-on-canvas",a=>{var l;this.emit("telemetry",{name:"find-empty-space-on-canvas"});try{let c;if(a.nodeId&&(c=i.scenegraph.getNodeByPath(a.nodeId),!c))throw new Error(`Failed to find a node with id ${a.nodeId}`);const u=i.scenegraph.findEmptySpaceOnCanvas(c,a.width,a.height,a.padding,a.direction);{let d={x:u.x,y:u.y};u.parent&&!u.parent.isRoot&&(d=u.parent.getWorldMatrix().apply(d)),i.skiaRenderer.addFlash({x:d.x,y:d.y,width:a.width,height:a.height,agentId:a.conversationId,longHold:!0,color:[200/255,200/255,200/255]})}return{success:!0,error:"",result:{x:u.x,y:u.y,parentId:(l=u.parent)==null?void 0:l.id}}}catch(c){return this.emit("telemetry",{name:"find-empty-space-on-canvas-failed",args:{error:c}}),{success:!1,error:c instanceof Error?c.message:"Failed to find empty space on canvas!"}}}),n.handle("snapshot-layout",a=>{const{conversationId:l,parentId:c,maxDepth:u,problemsOnly:d}=a;this.emit("telemetry",{name:"snapshot-layout"});try{return{success:!0,error:"",result:{nodes:u4e({sceneManager:i,agentId:l,parentId:c,maxDepth:u,problemsOnly:d})}}}catch(h){return this.emit("telemetry",{name:"snapshot-layout-failed",args:{error:h}}),{success:!1,error:h instanceof Error?h.message:"Failed to snapshot layout!"}}}),n.handle("get-screenshot",async a=>{const{nodeId:l}=a;this.emit("telemetry",{name:"get-screenshot"});try{const c=i.scenegraph.getNodeByPath(l);if(!c)throw new Error(`Failed to find a node with id ${l}`);i.skiaRenderer.addFlash({node:c,agentId:a.conversationId,longHold:!0});const u=i.skiaRenderer.exportToImage([c],{type:Mi.PNG,scale:1,resolution:512}).data;return{success:!0,error:"",result:{image:rR(u),mimeType:"image/png"}}}catch(c){return this.emit("telemetry",{name:"get-screenshot-failed",args:{error:c}}),{success:!1,error:c instanceof Error?c.message:"Failed to get screenshot!"}}}),n.handle("export-nodes",async a=>{const{nodeIds:l,format:c,scale:u,quality:d}=a;this.emit("telemetry",{name:"export-nodes"});try{return{success:!0,error:"",result:{images:await Fwt({sceneManager:i,nodeIds:l,format:c,scale:u,quality:d})}}}catch(h){return this.emit("telemetry",{name:"export-nodes-failed",args:{error:h}}),{success:!1,error:h instanceof Error?h.message:"Failed to export nodes!"}}}),n.handle("export-viewport",async()=>{this.emit("telemetry",{name:"export-viewport"});try{const a=i.scenegraph.getViewportNode().children;if(a.length===0)throw new Error("No nodes to export");i.skiaRenderer.exportToImage(a,{type:Mi.PNG,scale:1,resolution:10}),await i.skiaRenderer.fontManager.waitForAllFontsLoaded();const l=i.skiaRenderer.exportToImage(a,{type:Mi.PNG,scale:1,resolution:2048}).data;return{success:!0,error:"",result:{image:rR(l),mimeType:"image/png"}}}catch(a){return this.emit("telemetry",{name:"export-viewport-failed",args:{error:a}}),{success:!1,error:a instanceof Error?a.message:"Failed to export viewport!"}}}),n.handle("get-variables",async()=>{this.emit("telemetry",{name:"get-variables"});try{return{success:!0,error:"",result:c4e(i)}}catch(a){return this.emit("telemetry",{name:"get-variables-failed",args:{error:a}}),{success:!1,error:(a instanceof Error?a.message:String(a))||"Unknown error"}}}),n.handle("set-variables",async({replace:a,variables:l})=>{if(this.emit("telemetry",{name:"set-variables"}),i.scenegraph.isReadonly)return{success:!1,error:`The document '${i.scenegraph.documentURI&&zu(i.scenegraph.documentURI)}' is read-only`};const c=i.scenegraph.beginUpdate();try{if(a){const d=new Set(Object.keys(l));for(const h of Array.from(i.variableManager.variables.values()))h.document.id!==void 0&&(d.has(h.qualifiedName)?c.setVariable(h,[]):c.deleteVariable(h.qualifiedName))}for(const[d,h]of Object.entries(l)){const p=i.variableManager.getVariable(d);if(p!=null&&p.document.id)throw new Error(`Cannot change '${d}', because it's an imported variable from ${zu(p.document.uri)}`);if(d.includes(":"))throw new Error(`Variable names cannot contain colons: '${d}'`);if(!h||typeof h!="object")throw new Error(`Variable '${d}' does not have a valid definition: ${JSON.stringify(h)}`);if("type"in h){if(typeof h.type!="string"||!["color","string","number"].includes(h.type))throw new Error(`Variable '${d}' has an invalid 'type' property: ${JSON.stringify(h.type)}`);if(!("value"in h))throw new Error(`Variable '${d}' is missing its 'value' property`)}else throw new Error(`Variable '${d}' is missing its 'type' property`)}VK(c.rollback,l,i.variableManager,i.documentManager.document,d=>d,d=>d,(d,h)=>{throw new Error(`Variable '${d}' has an invalid value: ${h}`)},d=>{throw new Error(`Circular dependency on variable '${d}'`)},d=>{throw new Error(`Reference to non-existent variable '${d}'`)});const u=new Map(Array.from(i.variableManager.themes.entries()).map(([d,h])=>[d,{name:h.name,document:h.document,values:[...h.values]}]));if(a){const d=new Map;for(const p of i.variableManager.variables.values())for(const{theme:g}of p.values)if(g)for(const[b,v]of g.entries()){let w=d.get(b);w||(w=new Set,d.set(b,w)),w.add(v)}for(const[p,g]of Array.from(u.entries()))if(g.document.id===void 0){const b=d.get(p);b?g.values=g.values.filter(v=>b.has(v)):u.delete(p)}const h=p=>{p.properties.theme&&c.update(p,{theme:new Map(Array.from(p.properties.theme.entries()).filter(([g,b])=>{var v,w;return((v=u.get(g))==null?void 0:v.document.id)!==void 0||((w=d.get(g))==null?void 0:w.has(b))}))}),p.children.forEach(h)};h(i.scenegraph.getViewportNode())}for(const d of i.variableManager.variables.values())for(const{theme:h}of d.values)if(h)for(const[p,g]of h){const b=u.get(p);if(b){if(!b.values.includes(g)){if(b.document.id!==void 0)throw new Error(`Cannot add new value '${g}' to theme '${p}' imported from ${zu(b.document.uri)}`);b.values.push(g)}}else{if(p.includes(":"))throw new Error(`Theme keys cannot contain colons: '${p}'`);u.set(p,{name:p,document:i.documentManager.document,values:[g]})}}c.setThemes(Array.from(u.values()));for(const d of Object.keys(l)){const h=i.variableManager.getVariable(d);if(h.values.length>1){const p=new Map;for(const{theme:w}of h.values)if(w)for(const[k,A]of(w==null?void 0:w.entries())??[]){let T=p.get(k);T||(T=new Set,p.set(k,T)),T.add(A)}const g=[];for(const[w,k]of p.entries())g.push({axis:w,values:Array.from(k)});const b=new Array(h.values.length);b.fill(!1);const v=(w=0,k=new Map)=>{if(w===g.length)for(let A=h.values.length-1;A>=0;A--){const T=h.values[A];if(!T.theme||T.theme.entries().every(([P,R])=>k.get(P)===R)){b[A]=!0;break}}else for(const A of g[w].values)v(w+1,k.set(g[w].axis,A))};v(),b.includes(!1)&&c.setVariable(h,h.values.filter((w,k)=>b[k]))}}return i.scenegraph.commitBlock(c,{undo:!0}),{success:!0,result:{message:"Successfully set variables."},error:""}}catch(u){return this.emit("telemetry",{name:"set-variables-failed",args:{error:u}}),i.scenegraph.rollbackBlock(c),{success:!1,error:u instanceof Error?u.message:"Failed to set variables! Make sure to set variables in the correct format according to the .pen file schema returned by the `general` guidelines."}}}),n.handle("get-selection",async()=>{this.emit("telemetry",{name:"get-selection"});try{const a=i.selectionManager.getWorldspaceBounds();a&&i.skiaRenderer.addFlash({x:a.x,y:a.y,width:a.width,height:a.height,longHold:!1});const l=[];for(const c of i.selectionManager.selectedNodes)l.push(c.id),i.skiaRenderer.addFlash({node:c,longHold:!1,scanLine:!1});return{success:!0,error:"",result:{selectedElementIds:l}}}catch(a){return this.emit("telemetry",{name:"get-selection-failed",args:{error:a}}),{success:!1,error:a instanceof Error?a.message:"Failed to get selection!"}}}),n.handle("get-guidelines",async a=>{this.emit("telemetry",{name:"get-guidelines"});try{return{success:!0,error:"",result:{message:txt(a??{})}}}catch(l){return{success:!1,error:l instanceof Error?l.message:"Failed to get guidelines"}}}),n.handle("get-editor-state",async a=>{this.emit("telemetry",{name:"get-editor-state"});try{return{success:!0,error:"",result:{message:rxt(this.fileURI,i,void 0,a==null?void 0:a.include_schema)}}}catch(l){return this.emit("telemetry",{name:"get-editor-state-failed",args:{error:l}}),{success:!1,error:l instanceof Error?l.message:"Failed to get editor state!"}}}),n.handle("save-document",async()=>{try{let a;return this.fileURI&&(a=i.saveDocument(this.fileURI)),n.notify("save-resource",{content:a}),{success:!0}}catch(a){return{success:!1,error:a instanceof Error?a.message:"Failed to save"}}}),n.on("undo",()=>{i.undoManager.undo()}),n.on("redo",()=>{i.undoManager.redo()})}}
var Xj,qle;
function sxt(){if(qle)return Xj;qle=1;var t="Expected a function",e=NaN,n="[object Symbol]",r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,s=/^0o[0-7]+$/i,a=parseInt,l=typeof globalThis=="object"&&globalThis&&globalThis.Object===Object&&globalThis,c=typeof self=="object"&&self&&self.Object===Object&&self,u=l||c||Function("return this")(),d=Object.prototype,h=d.toString,p=Math.max,g=Math.min,b=function(){return u.Date.now()};function v(P,R,B){var j,I,L,N,z,G,K=0,W=!1,$=!1,oe=!0;if(typeof P!="function")throw new TypeError(t);R=T(R)||0,w(B)&&(W=!!B.leading,$="maxWait"in B,L=$?p(T(B.maxWait)||0,R):L,oe="trailing"in B?!!B.trailing:oe);function se(re){var X=j,ge=I;return j=I=void 0,K=re,N=P.apply(ge,X),N}function Y(re){return K=re,z=setTimeout(me,R),W?se(re):N}function Q(re){var X=re-G,ge=re-K,fe=R-X;return $?g(fe,L-ge):fe}function ae(re){var X=re-G,ge=re-K;return G===void 0||X>=R||X<0||$&&ge>=L}function me(){var re=b();if(ae(re))return ee(re);z=setTimeout(me,Q(re))}function ee(re){return z=void 0,oe&&j?se(re):(j=I=void 0,N)}function _e(){z!==void 0&&clearTimeout(z),K=0,j=G=I=z=void 0}function ke(){return z===void 0?N:ee(b())}function Oe(){var re=b(),X=ae(re);if(j=arguments,I=this,G=re,X){if(z===void 0)return Y(G);if($)return z=setTimeout(me,R),se(G)}return z===void 0&&(z=setTimeout(me,R)),N}return Oe.cancel=_e,Oe.flush=ke,Oe}function w(P){var R=typeof P;return!!P&&(R=="object"||R=="function")}function k(P){return!!P&&typeof P=="object"}function A(P){return typeof P=="symbol"||k(P)&&h.call(P)==n}function T(P){if(typeof P=="number")return P;if(A(P))return e;if(w(P)){var R=typeof P.valueOf=="function"?P.valueOf():P;P=w(R)?R+"":R}if(typeof P!="string")return P===0?P:+P;P=P.replace(r,"");var B=o.test(P);return B||s.test(P)?a(P.slice(2),B?2:8):i.test(P)?e:+P}return Xj=v,Xj}
var axt=sxt();
const jV=ql(axt);
const lxt=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),cxt=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,r)=>r?r.toUpperCase():n.toLowerCase()),Wle=t=>{const e=cxt(t);return e.charAt(0).toUpperCase()+e.slice(1)},d4e=(...t)=>t.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();
var uxt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
const dxt=M.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:o,iconNode:s,...a},l)=>M.createElement("svg",{ref:l,...uxt,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:d4e("lucide",i),...a},[...s.map(([c,u])=>M.createElement(c,u)),...Array.isArray(o)?o:[o]]));
const rn=(t,e)=>{const n=M.forwardRef(({className:r,...i},o)=>M.createElement(dxt,{ref:o,iconNode:e,className:d4e(`lucide-${lxt(Wle(t))}`,`lucide-${t}`,r),...i}));return n.displayName=Wle(t),n};
const hxt=[["path",{d:"M17 12H7",key:"16if0g"}],["path",{d:"M19 18H5",key:"18s9l3"}],["path",{d:"M21 6H3",key:"1jwq7v"}]],fxt=rn("align-center",hxt);
const pxt=[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2",key:"dy24zr"}],["rect",{width:"6",height:"10",x:"12",y:"7",rx:"2",key:"1ht384"}],["path",{d:"M22 2v20",key:"40qfg1"}]],mxt=rn("align-horizontal-justify-end",pxt);
const gxt=[["rect",{width:"6",height:"14",x:"6",y:"5",rx:"2",key:"hsirpf"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2",key:"13zkjt"}],["path",{d:"M2 2v20",key:"1ivd8o"}]],yxt=rn("align-horizontal-justify-start",gxt);
const bxt=[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2",key:"yn7j0q"}],["path",{d:"M4 22V2",key:"tsjzd3"}],["path",{d:"M20 22V2",key:"1bnhr8"}]],vxt=rn("align-horizontal-space-around",bxt);
const wxt=[["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 18h18",key:"1h113x"}],["path",{d:"M3 6h18",key:"d0wm0j"}]],xxt=rn("align-justify",wxt);
const _xt=[["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 18H3",key:"1amg6g"}],["path",{d:"M21 6H3",key:"1jwq7v"}]],Sxt=rn("align-left",_xt);
const kxt=[["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M21 18H7",key:"1ygte8"}],["path",{d:"M21 6H3",key:"1jwq7v"}]],Cxt=rn("align-right",kxt);
const Axt=[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2",key:"1n4dg1"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2",key:"17khns"}],["path",{d:"M22 2H2",key:"fhrpnj"}]],Ext=rn("align-start-horizontal",Axt);
const Txt=[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2",key:"lpm2y7"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2",key:"rdj6ps"}],["path",{d:"M2 2v20",key:"1ivd8o"}]],Mxt=rn("align-start-vertical",Txt);
const Pxt=[["rect",{width:"14",height:"6",x:"5",y:"12",rx:"2",key:"4l4tp2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2",key:"ypihtt"}],["path",{d:"M2 22h20",key:"272qi7"}]],Nxt=rn("align-vertical-justify-end",Pxt);
const Rxt=[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2",key:"1i8z2d"}],["rect",{width:"10",height:"6",x:"7",y:"6",rx:"2",key:"13squh"}],["path",{d:"M2 2h20",key:"1ennik"}]],Ixt=rn("align-vertical-justify-start",Rxt);
const Oxt=[["rect",{width:"10",height:"6",x:"7",y:"9",rx:"2",key:"b1zbii"}],["path",{d:"M22 20H2",key:"1p1f7z"}],["path",{d:"M22 4H2",key:"1b7qnq"}]],Dxt=rn("align-vertical-space-around",Oxt);
const Lxt=[["path",{d:"M19 3H5",key:"1236rx"}],["path",{d:"M12 21V7",key:"gj6g52"}],["path",{d:"m6 15 6 6 6-6",key:"h15q88"}]],Bxt=rn("arrow-down-from-line",Lxt);
const Fxt=[["path",{d:"M12 17V3",key:"1cwfxf"}],["path",{d:"m6 11 6 6 6-6",key:"12ii2o"}],["path",{d:"M19 21H5",key:"150jfl"}]],jxt=rn("arrow-down-to-line",Fxt);
const zxt=[["path",{d:"M3 5v14",key:"1nt18q"}],["path",{d:"M21 12H7",key:"13ipq5"}],["path",{d:"m15 18 6-6-6-6",key:"6tx3qv"}]],h4e=rn("arrow-right-from-line",zxt);
const Uxt=[["path",{d:"M5 3h14",key:"7usisc"}],["path",{d:"m18 13-6-6-6 6",key:"1kf1n9"}],["path",{d:"M12 7v14",key:"1akyts"}]],Gxt=rn("arrow-up-to-line",Uxt);
const Hxt=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],$le=rn("arrow-up",Hxt);
const Vxt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m4.9 4.9 14.2 14.2",key:"1m5liu"}]],qxt=rn("ban",Vxt);
const Wxt=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],$xt=rn("book-open",Wxt);
const Yxt=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],Xxt=rn("bot",Yxt);
const Kxt=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],O_=rn("check",Kxt);
const Zxt=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ef=rn("chevron-down",Zxt);
const Jxt=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Qxt=rn("chevron-left",Jxt);
const e_t=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],oZ=rn("chevron-right",e_t);
const t_t=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],n_t=rn("chevron-up",t_t);
const r_t=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],AO=rn("chevrons-up-down",r_t);
const i_t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],o_t=rn("circle-alert",i_t);
const s_t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],EO=rn("circle-check",s_t);
const a_t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],l_t=rn("circle-help",a_t);
const c_t=[["path",{d:"M18 20a6 6 0 0 0-12 0",key:"1qehca"}],["circle",{cx:"12",cy:"10",r:"4",key:"1h16sb"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],u_t=rn("circle-user-round",c_t);
const d_t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],sZ=rn("circle",d_t);
const h_t=[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]],f_t=rn("code",h_t);
const p_t=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],m_t=rn("copy",p_t);
const g_t=[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",key:"1ey20j"}],["path",{d:"M8 12h8",key:"1wcyev"}]],cR=rn("diamond-minus",g_t);
const y_t=[["path",{d:"M12 8v8",key:"napkw2"}],["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",key:"1ey20j"}],["path",{d:"M8 12h8",key:"1wcyev"}]],f4e=rn("diamond-plus",y_t);
const b_t=[["path",{d:"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",key:"1f1r0c"}]],aZ=rn("diamond",b_t);
const v_t=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],p4e=rn("ellipsis",v_t);
const w_t=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],lZ=rn("eye-off",w_t);
const x_t=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],cZ=rn("eye",x_t);
const S_t=[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]],k_t=rn("focus",S_t);
const C_t=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],A_t=rn("folder-open",C_t);
const E_t=[["line",{x1:"22",x2:"2",y1:"6",y2:"6",key:"15w7dq"}],["line",{x1:"22",x2:"2",y1:"18",y2:"18",key:"1ip48p"}],["line",{x1:"6",x2:"6",y1:"2",y2:"22",key:"a2lnyx"}],["line",{x1:"18",x2:"18",y1:"2",y2:"22",key:"8vb6jd"}]],T_t=rn("frame",E_t);
const M_t=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["rect",{width:"10",height:"8",x:"7",y:"8",rx:"1",key:"vys8me"}]],P_t=rn("fullscreen",M_t);
const N_t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],R_t=rn("image",N_t);
const I_t=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],O_t=rn("layers",I_t);
const D_t=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],L_t=rn("layout-dashboard",D_t);
const B_t=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],u_=rn("loader-circle",B_t);
const F_t=[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]],g4e=rn("loader",F_t);
const j_t=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],y4e=rn("log-out",j_t);
const z_t=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],U_t=rn("message-circle-warning",z_t);
const G_t=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],lE=rn("message-square",G_t);
const H_t=[["path",{d:"M5 12h14",key:"1ays0h"}]],D_=rn("minus",H_t);
const V_t=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],q_t=rn("moon",V_t);
const W_t=[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]],b4e=rn("palette",W_t);
const $_t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],Y_t=rn("panel-left",$_t);
const X_t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]],K_t=rn("panel-right-open",X_t);
const Z_t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}]],J_t=rn("panel-right",Z_t);
const Q_t=[["path",{d:"M13.234 20.252 21 12.3",key:"1cbrk9"}],["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486",key:"1pkts6"}]],uZ=rn("paperclip",Q_t);
const e2t=[["path",{d:"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",key:"nt11vn"}],["path",{d:"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",key:"15qc1e"}],["path",{d:"m2.3 2.3 7.286 7.286",key:"1wuzzi"}],["circle",{cx:"11",cy:"11",r:"2",key:"xmgehs"}]],t2t=rn("pen-tool",e2t);
const n2t=[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}],["path",{d:"m15 5 3 3",key:"1w25hb"}]],TO=rn("pencil-line",n2t);
const r2t=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],i2t=rn("pencil",r2t);
const o2t=[["path",{d:"m2 22 1-1h3l9-9",key:"1sre89"}],["path",{d:"M3 21v-3l9-9",key:"hpe2y6"}],["path",{d:"m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z",key:"196du1"}]],s2t=rn("pipette",o2t);
const a2t=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],dZ=rn("play",a2t);
const l2t=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Vd=rn("plus",l2t);
const c2t=[["path",{d:"M2 3h20",key:"91anmk"}],["path",{d:"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3",key:"2k9sn8"}],["path",{d:"m7 21 5-5 5 5",key:"bip4we"}]],u2t=rn("presentation",c2t);
const d2t=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M7 8h8",key:"1jbsf9"}],["path",{d:"M7 12h10",key:"b7w52i"}],["path",{d:"M7 16h6",key:"1vyc9m"}]],h2t=rn("scan-text",d2t);
const f2t=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]],zV=rn("scan",f2t);
const p2t=[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]],m2t=rn("scroll-text",p2t);
const g2t=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],y2t=rn("search",g2t);
const b2t=[["line",{x1:"12",x2:"12",y1:"3",y2:"21",key:"1efggb"}],["polyline",{points:"8 8 4 12 8 16",key:"bnfmv4"}],["polyline",{points:"16 16 20 12 16 8",key:"u90052"}]],v2t=rn("separator-vertical",b2t);
const w2t=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],v4e=rn("settings",w2t);
const x2t=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]],_2t=rn("shield-alert",x2t);
const S2t=[["path",{d:"M5 3a2 2 0 0 0-2 2",key:"y57alp"}],["path",{d:"M19 3a2 2 0 0 1 2 2",key:"18rm91"}],["path",{d:"M21 19a2 2 0 0 1-2 2",key:"1j7049"}],["path",{d:"M5 21a2 2 0 0 1-2-2",key:"sbafld"}],["path",{d:"M9 3h1",key:"1yesri"}],["path",{d:"M9 21h1",key:"15o7lz"}],["path",{d:"M14 3h1",key:"1ec4yj"}],["path",{d:"M14 21h1",key:"v9vybs"}],["path",{d:"M3 9v1",key:"1r0deq"}],["path",{d:"M21 9v1",key:"mxsmne"}],["path",{d:"M3 14v1",key:"vnatye"}],["path",{d:"M21 14v1",key:"169vum"}]],w4e=rn("square-dashed",S2t);
const k2t=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],x4e=rn("square-pen",k2t);
const C2t=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],MS=rn("square",C2t);
const A2t=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],E2t=rn("sun",A2t);
const T2t=[["path",{d:"m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19",key:"1cbfv1"}],["path",{d:"M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z",key:"135mg7"}],["circle",{cx:"6.5",cy:"9.5",r:".5",fill:"currentColor",key:"5pm5xn"}]],_4e=rn("tags",T2t);
const M2t=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],cE=rn("terminal",M2t);
const P2t=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],N2t=rn("trash-2",P2t);
const R2t=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],h3=rn("triangle-alert",R2t);
const I2t=[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]],O2t=rn("type",I2t);
const D2t=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],S4e=rn("user",D2t);
const L2t=[["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0",key:"1bycff"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69",key:"1dl1wf"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523",key:"4k23kn"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643",key:"1grhjp"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764",key:"z3jwby"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],B2t=rn("wifi-off",L2t);
const F2t=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],jy=rn("x",F2t);
const j2t=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],z2t=rn("zap",j2t);
var Kj,Yle;
function U2t(){if(Yle)return Kj;Yle=1;function t(i){if(typeof i!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(i))}function e(i,o){for(var s="",a=0,l=-1,c=0,u,d=0;d<=i.length;++d){if(d<i.length)u=i.charCodeAt(d);else{if(u===47)break;u=47}if(u===47){if(!(l===d-1||c===1))if(l!==d-1&&c===2){if(s.length<2||a!==2||s.charCodeAt(s.length-1)!==46||s.charCodeAt(s.length-2)!==46){if(s.length>2){var h=s.lastIndexOf("/");if(h!==s.length-1){h===-1?(s="",a=0):(s=s.slice(0,h),a=s.length-1-s.lastIndexOf("/")),l=d,c=0;continue}}else if(s.length===2||s.length===1){s="",a=0,l=d,c=0;continue}}o&&(s.length>0?s+="/..":s="..",a=2)}else s.length>0?s+="/"+i.slice(l+1,d):s=i.slice(l+1,d),a=d-l-1;l=d,c=0}else u===46&&c!==-1?++c:c=-1}return s}function n(i,o){var s=o.dir||o.root,a=o.base||(o.name||"")+(o.ext||"");return s?s===o.root?s+a:s+i+a:a}var r={resolve:function(){for(var o="",s=!1,a,l=arguments.length-1;l>=-1&&!s;l--){var c;l>=0?c=arguments[l]:(a===void 0&&(a=process.cwd()),c=a),t(c),c.length!==0&&(o=c+"/"+o,s=c.charCodeAt(0)===47)}return o=e(o,!s),s?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(o){if(t(o),o.length===0)return".";var s=o.charCodeAt(0)===47,a=o.charCodeAt(o.length-1)===47;return o=e(o,!s),o.length===0&&!s&&(o="."),o.length>0&&a&&(o+="/"),s?"/"+o:o},isAbsolute:function(o){return t(o),o.length>0&&o.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var o,s=0;s<arguments.length;++s){var a=arguments[s];t(a),a.length>0&&(o===void 0?o=a:o+="/"+a)}return o===void 0?".":r.normalize(o)},relative:function(o,s){if(t(o),t(s),o===s||(o=r.resolve(o),s=r.resolve(s),o===s))return"";for(var a=1;a<o.length&&o.charCodeAt(a)===47;++a);for(var l=o.length,c=l-a,u=1;u<s.length&&s.charCodeAt(u)===47;++u);for(var d=s.length,h=d-u,p=c<h?c:h,g=-1,b=0;b<=p;++b){if(b===p){if(h>p){if(s.charCodeAt(u+b)===47)return s.slice(u+b+1);if(b===0)return s.slice(u+b)}else c>p&&(o.charCodeAt(a+b)===47?g=b:b===0&&(g=0));break}var v=o.charCodeAt(a+b),w=s.charCodeAt(u+b);if(v!==w)break;v===47&&(g=b)}var k="";for(b=a+g+1;b<=l;++b)(b===l||o.charCodeAt(b)===47)&&(k.length===0?k+="..":k+="/..");return k.length>0?k+s.slice(u+g):(u+=g,s.charCodeAt(u)===47&&++u,s.slice(u))},_makeLong:function(o){return o},dirname:function(o){if(t(o),o.length===0)return".";for(var s=o.charCodeAt(0),a=s===47,l=-1,c=!0,u=o.length-1;u>=1;--u)if(s=o.charCodeAt(u),s===47){if(!c){l=u;break}}else c=!1;return l===-1?a?"/":".":a&&l===1?"//":o.slice(0,l)},basename:function(o,s){if(s!==void 0&&typeof s!="string")throw new TypeError('"ext" argument must be a string');t(o);var a=0,l=-1,c=!0,u;if(s!==void 0&&s.length>0&&s.length<=o.length){if(s.length===o.length&&s===o)return"";var d=s.length-1,h=-1;for(u=o.length-1;u>=0;--u){var p=o.charCodeAt(u);if(p===47){if(!c){a=u+1;break}}else h===-1&&(c=!1,h=u+1),d>=0&&(p===s.charCodeAt(d)?--d===-1&&(l=u):(d=-1,l=h))}return a===l?l=h:l===-1&&(l=o.length),o.slice(a,l)}else{for(u=o.length-1;u>=0;--u)if(o.charCodeAt(u)===47){if(!c){a=u+1;break}}else l===-1&&(c=!1,l=u+1);return l===-1?"":o.slice(a,l)}},extname:function(o){t(o);for(var s=-1,a=0,l=-1,c=!0,u=0,d=o.length-1;d>=0;--d){var h=o.charCodeAt(d);if(h===47){if(!c){a=d+1;break}continue}l===-1&&(c=!1,l=d+1),h===46?s===-1?s=d:u!==1&&(u=1):s!==-1&&(u=-1)}return s===-1||l===-1||u===0||u===1&&s===l-1&&s===a+1?"":o.slice(s,l)},format:function(o){if(o===null||typeof o!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof o);return n("/",o)},parse:function(o){t(o);var s={root:"",dir:"",base:"",ext:"",name:""};if(o.length===0)return s;var a=o.charCodeAt(0),l=a===47,c;l?(s.root="/",c=1):c=0;for(var u=-1,d=0,h=-1,p=!0,g=o.length-1,b=0;g>=c;--g){if(a=o.charCodeAt(g),a===47){if(!p){d=g+1;break}continue}h===-1&&(p=!1,h=g+1),a===46?u===-1?u=g:b!==1&&(b=1):u!==-1&&(b=-1)}return u===-1||h===-1||b===0||b===1&&u===h-1&&u===d+1?h!==-1&&(d===0&&l?s.base=s.name=o.slice(1,h):s.base=s.name=o.slice(d,h)):(d===0&&l?(s.name=o.slice(1,u),s.base=o.slice(1,h)):(s.name=o.slice(d,u),s.base=o.slice(d,h)),s.ext=o.slice(u,h)),d>0?s.dir=o.slice(0,d-1):l&&(s.dir="/"),s},sep:"/",delimiter:":",win32:null,posix:null};return r.posix=r,Kj=r,Kj}
var NP=U2t();
const lS=ql(NP);
function G2t(t,e){const n={};return(t[t.length-1]===""?[...t,""]:t).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}
const H2t=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,V2t=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,q2t={};
function Xle(t,e){return(q2t.jsx?V2t:H2t).test(t)}
const W2t=/[ \t\n\f\r]/g;
function $2t(t){return typeof t=="object"?t.type==="text"?Kle(t.value):!1:Kle(t)}
function Kle(t){return t.replace(W2t,"")===""}
class x8{constructor(e,n,r){this.normal=n,this.property=e,r&&(this.space=r)}}
function k4e(t,e){const n={},r={};for(const i of t)Object.assign(n,i.property),Object.assign(r,i.normal);return new x8(n,r,e)}
function UV(t){return t.toLowerCase()}
class lh{constructor(e,n){this.attribute=n,this.property=e}}
let Y2t=0;
const ai=L_(),yl=L_(),GV=L_(),Jt=L_(),Ss=L_(),PS=L_(),Rh=L_();
function L_(){return 2**++Y2t}
const HV=Object.freeze(Object.defineProperty({__proto__:null,boolean:ai,booleanish:yl,commaOrSpaceSeparated:Rh,commaSeparated:PS,number:Jt,overloadedBoolean:GV,spaceSeparated:Ss},Symbol.toStringTag,{value:"Module"})),Zj=Object.keys(HV);
class hZ extends lh{constructor(e,n,r,i){let o=-1;if(super(e,n),Zle(this,"space",i),typeof r=="number")for(;++o<Zj.length;){const s=Zj[o];Zle(this,Zj[o],(r&HV[s])===HV[s])}}}
function Zle(t,e,n){n&&(t[e]=n)}
function f3(t){const e={},n={};for(const[r,i]of Object.entries(t.properties)){const o=new hZ(r,t.transform(t.attributes||{},r),i,t.space);t.mustUseProperty&&t.mustUseProperty.includes(r)&&(o.mustUseProperty=!0),e[r]=o,n[UV(r)]=r,n[UV(o.attribute)]=r}return new x8(e,n,t.space)}
const C4e=f3({properties:{ariaActiveDescendant:null,ariaAtomic:yl,ariaAutoComplete:null,ariaBusy:yl,ariaChecked:yl,ariaColCount:Jt,ariaColIndex:Jt,ariaColSpan:Jt,ariaControls:Ss,ariaCurrent:null,ariaDescribedBy:Ss,ariaDetails:null,ariaDisabled:yl,ariaDropEffect:Ss,ariaErrorMessage:null,ariaExpanded:yl,ariaFlowTo:Ss,ariaGrabbed:yl,ariaHasPopup:null,ariaHidden:yl,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ss,ariaLevel:Jt,ariaLive:null,ariaModal:yl,ariaMultiLine:yl,ariaMultiSelectable:yl,ariaOrientation:null,ariaOwns:Ss,ariaPlaceholder:null,ariaPosInSet:Jt,ariaPressed:yl,ariaReadOnly:yl,ariaRelevant:null,ariaRequired:yl,ariaRoleDescription:Ss,ariaRowCount:Jt,ariaRowIndex:Jt,ariaRowSpan:Jt,ariaSelected:yl,ariaSetSize:Jt,ariaSort:null,ariaValueMax:Jt,ariaValueMin:Jt,ariaValueNow:Jt,ariaValueText:null,role:null},transform(t,e){return e==="role"?e:"aria-"+e.slice(4).toLowerCase()}});
function A4e(t,e){return e in t?t[e]:e}
function E4e(t,e){return A4e(t,e.toLowerCase())}
const X2t=f3({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:PS,acceptCharset:Ss,accessKey:Ss,action:null,allow:null,allowFullScreen:ai,allowPaymentRequest:ai,allowUserMedia:ai,alt:null,as:null,async:ai,autoCapitalize:null,autoComplete:Ss,autoFocus:ai,autoPlay:ai,blocking:Ss,capture:null,charSet:null,checked:ai,cite:null,className:Ss,cols:Jt,colSpan:null,content:null,contentEditable:yl,controls:ai,controlsList:Ss,coords:Jt|PS,crossOrigin:null,data:null,dateTime:null,decoding:null,default:ai,defer:ai,dir:null,dirName:null,disabled:ai,download:GV,draggable:yl,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:ai,formTarget:null,headers:Ss,height:Jt,hidden:GV,high:Jt,href:null,hrefLang:null,htmlFor:Ss,httpEquiv:Ss,id:null,imageSizes:null,imageSrcSet:null,inert:ai,inputMode:null,integrity:null,is:null,isMap:ai,itemId:null,itemProp:Ss,itemRef:Ss,itemScope:ai,itemType:Ss,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:ai,low:Jt,manifest:null,max:null,maxLength:Jt,media:null,method:null,min:null,minLength:Jt,multiple:ai,muted:ai,name:null,nonce:null,noModule:ai,noValidate:ai,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:ai,optimum:Jt,pattern:null,ping:Ss,placeholder:null,playsInline:ai,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:ai,referrerPolicy:null,rel:Ss,required:ai,reversed:ai,rows:Jt,rowSpan:Jt,sandbox:Ss,scope:null,scoped:ai,seamless:ai,selected:ai,shadowRootClonable:ai,shadowRootDelegatesFocus:ai,shadowRootMode:null,shape:null,size:Jt,sizes:null,slot:null,span:Jt,spellCheck:yl,src:null,srcDoc:null,srcLang:null,srcSet:null,start:Jt,step:null,style:null,tabIndex:Jt,target:null,title:null,translate:null,type:null,typeMustMatch:ai,useMap:null,value:yl,width:Jt,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ss,axis:null,background:null,bgColor:null,border:Jt,borderColor:null,bottomMargin:Jt,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:ai,declare:ai,event:null,face:null,frame:null,frameBorder:null,hSpace:Jt,leftMargin:Jt,link:null,longDesc:null,lowSrc:null,marginHeight:Jt,marginWidth:Jt,noResize:ai,noHref:ai,noShade:ai,noWrap:ai,object:null,profile:null,prompt:null,rev:null,rightMargin:Jt,rules:null,scheme:null,scrolling:yl,standby:null,summary:null,text:null,topMargin:Jt,valueType:null,version:null,vAlign:null,vLink:null,vSpace:Jt,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:ai,disableRemotePlayback:ai,prefix:null,property:null,results:Jt,security:null,unselectable:null},space:"html",transform:E4e}),K2t=f3({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:Rh,accentHeight:Jt,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:Jt,amplitude:Jt,arabicForm:null,ascent:Jt,attributeName:null,attributeType:null,azimuth:Jt,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:Jt,by:null,calcMode:null,capHeight:Jt,className:Ss,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:Jt,diffuseConstant:Jt,direction:null,display:null,dur:null,divisor:Jt,dominantBaseline:null,download:ai,dx:null,dy:null,edgeMode:null,editable:null,elevation:Jt,enableBackground:null,end:null,event:null,exponent:Jt,externalResourcesRequired:null,fill:null,fillOpacity:Jt,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:PS,g2:PS,glyphName:PS,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:Jt,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:Jt,horizOriginX:Jt,horizOriginY:Jt,id:null,ideographic:Jt,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:Jt,k:Jt,k1:Jt,k2:Jt,k3:Jt,k4:Jt,kernelMatrix:Rh,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:Jt,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:Jt,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:Jt,overlineThickness:Jt,paintOrder:null,panose1:null,path:null,pathLength:Jt,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ss,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:Jt,pointsAtY:Jt,pointsAtZ:Jt,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Rh,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Rh,rev:Rh,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Rh,requiredFeatures:Rh,requiredFonts:Rh,requiredFormats:Rh,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:Jt,specularExponent:Jt,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:Jt,strikethroughThickness:Jt,string:null,stroke:null,strokeDashArray:Rh,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:Jt,strokeOpacity:Jt,strokeWidth:null,style:null,surfaceScale:Jt,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Rh,tabIndex:Jt,tableValues:null,target:null,targetX:Jt,targetY:Jt,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Rh,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:Jt,underlineThickness:Jt,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:Jt,values:null,vAlphabetic:Jt,vMathematical:Jt,vectorEffect:null,vHanging:Jt,vIdeographic:Jt,version:null,vertAdvY:Jt,vertOriginX:Jt,vertOriginY:Jt,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:Jt,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:A4e}),T4e=f3({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(t,e){return"xlink:"+e.slice(5).toLowerCase()}}),M4e=f3({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:E4e}),P4e=f3({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(t,e){return"xml:"+e.slice(3).toLowerCase()}}),Z2t={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},J2t=/[A-Z]/g,Jle=/-[a-z]/g,Q2t=/^data[-\w.:]+$/i;
function e6t(t,e){const n=UV(e);let r=e,i=lh;if(n in t.normal)return t.property[t.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&Q2t.test(e)){if(e.charAt(4)==="-"){const o=e.slice(5).replace(Jle,n6t);r="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=e.slice(4);if(!Jle.test(o)){let s=o.replace(J2t,t6t);s.charAt(0)!=="-"&&(s="-"+s),e="data"+s}}i=hZ}return new i(r,e)}
function t6t(t){return"-"+t.toLowerCase()}
function n6t(t){return t.charAt(1).toUpperCase()}
const r6t=k4e([C4e,X2t,T4e,M4e,P4e],"html"),fZ=k4e([C4e,K2t,T4e,M4e,P4e],"svg");
function i6t(t){return t.join(" ").trim()}
var C6={},Jj,Qle;
function o6t(){if(Qle)return Jj;Qle=1;var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,e=/\n/g,n=/^\s*/,r=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,i=/^:\s*/,o=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,s=/^[;\s]*/,a=/^\s+|\s+$/g,l=`
`,c="/",u="*",d="",h="comment",p="declaration";function g(v,w){if(typeof v!="string")throw new TypeError("First argument must be a string");if(!v)return[];w=w||{};var k=1,A=1;function T(K){var W=K.match(e);W&&(k+=W.length);var $=K.lastIndexOf(l);A=~$?K.length-$:A+K.length}function P(){var K={line:k,column:A};return function(W){return W.position=new R(K),I(),W}}function R(K){this.start=K,this.end={line:k,column:A},this.source=w.source}R.prototype.content=v;function B(K){var W=new Error(w.source+":"+k+":"+A+": "+K);if(W.reason=K,W.filename=w.source,W.line=k,W.column=A,W.source=v,!w.silent)throw W}function j(K){var W=K.exec(v);if(W){var $=W[0];return T($),v=v.slice($.length),W}}function I(){j(n)}function L(K){var W;for(K=K||[];W=N();)W!==!1&&K.push(W);return K}function N(){var K=P();if(!(c!=v.charAt(0)||u!=v.charAt(1))){for(var W=2;d!=v.charAt(W)&&(u!=v.charAt(W)||c!=v.charAt(W+1));)++W;if(W+=2,d===v.charAt(W-1))return B("End of comment missing");var $=v.slice(2,W-2);return A+=2,T($),v=v.slice(W),A+=2,K({type:h,comment:$})}}function z(){var K=P(),W=j(r);if(W){if(N(),!j(i))return B("property missing ':'");var $=j(o),oe=K({type:p,property:b(W[0].replace(t,d)),value:$?b($[0].replace(t,d)):d});return j(s),oe}}function G(){var K=[];L(K);for(var W;W=z();)W!==!1&&(K.push(W),L(K));return K}return I(),G()}function b(v){return v?v.replace(a,d):d}return Jj=g,Jj}
var ece;
function s6t(){if(ece)return C6;ece=1;var t=C6&&C6.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(C6,"__esModule",{value:!0}),C6.default=n;const e=t(o6t());function n(r,i){let o=null;if(!r||typeof r!="string")return o;const s=(0,e.default)(r),a=typeof i=="function";return s.forEach(l=>{if(l.type!=="declaration")return;const{property:c,value:u}=l;a?i(c,u,l):u&&(o=o||{},o[c]=u)}),o}return C6}
var I4={},tce;
function a6t(){if(tce)return I4;tce=1,Object.defineProperty(I4,"__esModule",{value:!0}),I4.camelCase=void 0;var t=/^--[a-zA-Z0-9_-]+$/,e=/-([a-z])/g,n=/^[^-]+$/,r=/^-(webkit|moz|ms|o|khtml)-/,i=/^-(ms)-/,o=function(c){return!c||n.test(c)||t.test(c)},s=function(c,u){return u.toUpperCase()},a=function(c,u){return"".concat(u,"-")},l=function(c,u){return u===void 0&&(u={}),o(c)?c:(c=c.toLowerCase(),u.reactCompat?c=c.replace(i,a):c=c.replace(r,a),c.replace(e,s))};return I4.camelCase=l,I4}
var O4,nce;
function l6t(){if(nce)return O4;nce=1;var t=O4&&O4.__importDefault||function(i){return i&&i.__esModule?i:{default:i}},e=t(s6t()),n=a6t();function r(i,o){var s={};return!i||typeof i!="string"||(0,e.default)(i,function(a,l){a&&l&&(s[(0,n.camelCase)(a,o)]=l)}),s}return r.default=r,O4=r,O4}
var c6t=l6t();
const u6t=ql(c6t),N4e=R4e("end"),pZ=R4e("start");
function R4e(t){return e;function e(n){const r=n&&n.position&&n.position[t]||{};if(typeof r.line=="number"&&r.line>0&&typeof r.column=="number"&&r.column>0)return{line:r.line,column:r.column,offset:typeof r.offset=="number"&&r.offset>-1?r.offset:void 0}}}
function d6t(t){const e=pZ(t),n=N4e(t);if(e&&n)return{start:e,end:n}}
function sA(t){return!t||typeof t!="object"?"":"position"in t||"type"in t?rce(t.position):"start"in t||"end"in t?rce(t):"line"in t||"column"in t?VV(t):""}
function VV(t){return ice(t&&t.line)+":"+ice(t&&t.column)}
function rce(t){return VV(t&&t.start)+"-"+VV(t&&t.end)}
function ice(t){return t&&typeof t=="number"?t:1}
class yu extends Error{constructor(e,n,r){super(),typeof n=="string"&&(r=n,n=void 0);let i="",o={},s=!1;if(n&&("line"in n&&"column"in n?o={place:n}:"start"in n&&"end"in n?o={place:n}:"type"in n?o={ancestors:[n],place:n.position}:o={...n}),typeof e=="string"?i=e:!o.cause&&e&&(s=!0,i=e.message,o.cause=e),!o.ruleId&&!o.source&&typeof r=="string"){const l=r.indexOf(":");l===-1?o.ruleId=r:(o.source=r.slice(0,l),o.ruleId=r.slice(l+1))}if(!o.place&&o.ancestors&&o.ancestors){const l=o.ancestors[o.ancestors.length-1];l&&(o.place=l.position)}const a=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file="",this.message=i,this.line=a?a.line:void 0,this.name=sA(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=s&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}
const mZ={}.hasOwnProperty,h6t=new Map,f6t=/[A-Z]/g,p6t=new Set(["table","tbody","thead","tfoot","tr"]),m6t=new Set(["td","th"]),I4e="https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function g6t(t,e){if(!e||e.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=e.filePath||void 0;let r;if(e.development){if(typeof e.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");r=k6t(n,e.jsxDEV)}else{if(typeof e.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof e.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");r=S6t(n,e.jsx,e.jsxs)}const i={Fragment:e.Fragment,ancestors:[],components:e.components||{},create:r,elementAttributeNameCase:e.elementAttributeNameCase||"react",evaluater:e.createEvaluater?e.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:e.ignoreInvalidStyle||!1,passKeys:e.passKeys!==!1,passNode:e.passNode||!1,schema:e.space==="svg"?fZ:r6t,stylePropertyNameCase:e.stylePropertyNameCase||"dom",tableCellAlignToStyle:e.tableCellAlignToStyle!==!1},o=O4e(i,t,void 0);return o&&typeof o!="string"?o:i.create(t,i.Fragment,{children:o||void 0},void 0)}
function O4e(t,e,n){if(e.type==="element")return y6t(t,e,n);if(e.type==="mdxFlowExpression"||e.type==="mdxTextExpression")return b6t(t,e);if(e.type==="mdxJsxFlowElement"||e.type==="mdxJsxTextElement")return w6t(t,e,n);if(e.type==="mdxjsEsm")return v6t(t,e);if(e.type==="root")return x6t(t,e,n);if(e.type==="text")return _6t(t,e)}
function y6t(t,e,n){const r=t.schema;let i=r;e.tagName.toLowerCase()==="svg"&&r.space==="html"&&(i=fZ,t.schema=i),t.ancestors.push(e);const o=L4e(t,e.tagName,!1),s=C6t(t,e);let a=yZ(t,e);return p6t.has(e.tagName)&&(a=a.filter(function(l){return typeof l=="string"?!$2t(l):!0})),D4e(t,s,o,e),gZ(s,a),t.ancestors.pop(),t.schema=r,t.create(e,o,s,n)}
function b6t(t,e){if(e.data&&e.data.estree&&t.evaluater){const r=e.data.estree.body[0];return r.type,t.evaluater.evaluateExpression(r.expression)}uE(t,e.position)}
function v6t(t,e){if(e.data&&e.data.estree&&t.evaluater)return t.evaluater.evaluateProgram(e.data.estree);uE(t,e.position)}
function w6t(t,e,n){const r=t.schema;let i=r;e.name==="svg"&&r.space==="html"&&(i=fZ,t.schema=i),t.ancestors.push(e);const o=e.name===null?t.Fragment:L4e(t,e.name,!0),s=A6t(t,e),a=yZ(t,e);return D4e(t,s,o,e),gZ(s,a),t.ancestors.pop(),t.schema=r,t.create(e,o,s,n)}
function x6t(t,e,n){const r={};return gZ(r,yZ(t,e)),t.create(e,t.Fragment,r,n)}
function _6t(t,e){return e.value}
function D4e(t,e,n,r){typeof n!="string"&&n!==t.Fragment&&t.passNode&&(e.node=r)}
function gZ(t,e){if(e.length>0){const n=e.length>1?e:e[0];n&&(t.children=n)}}
function S6t(t,e,n){return r;function r(i,o,s,a){const c=Array.isArray(s.children)?n:e;return a?c(o,s,a):c(o,s)}}
function k6t(t,e){return n;function n(r,i,o,s){const a=Array.isArray(o.children),l=pZ(r);return e(i,o,s,a,{columnNumber:l?l.column-1:void 0,fileName:t,lineNumber:l?l.line:void 0},void 0)}}
function C6t(t,e){const n={};let r,i;for(i in e.properties)if(i!=="children"&&mZ.call(e.properties,i)){const o=E6t(t,i,e.properties[i]);if(o){const[s,a]=o;t.tableCellAlignToStyle&&s==="align"&&typeof a=="string"&&m6t.has(e.tagName)?r=a:n[s]=a}}if(r){const o=n.style||(n.style={});o[t.stylePropertyNameCase==="css"?"text-align":"textAlign"]=r}return n}
function A6t(t,e){const n={};for(const r of e.attributes)if(r.type==="mdxJsxExpressionAttribute")if(r.data&&r.data.estree&&t.evaluater){const o=r.data.estree.body[0];o.type;const s=o.expression;s.type;const a=s.properties[0];a.type,Object.assign(n,t.evaluater.evaluateExpression(a.argument))}else uE(t,e.position);else{const i=r.name;let o;if(r.value&&typeof r.value=="object")if(r.value.data&&r.value.data.estree&&t.evaluater){const a=r.value.data.estree.body[0];a.type,o=t.evaluater.evaluateExpression(a.expression)}else uE(t,e.position);else o=r.value===null?!0:r.value;n[i]=o}return n}
function yZ(t,e){const n=[];let r=-1;const i=t.passKeys?new Map:h6t;for(;++r<e.children.length;){const o=e.children[r];let s;if(t.passKeys){const l=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(l){const c=i.get(l)||0;s=l+"-"+c,i.set(l,c+1)}}const a=O4e(t,o,s);a!==void 0&&n.push(a)}return n}
function E6t(t,e,n){const r=e6t(t.schema,e);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?G2t(n):i6t(n)),r.property==="style"){let i=typeof n=="object"?n:T6t(t,String(n));return t.stylePropertyNameCase==="css"&&(i=M6t(i)),["style",i]}return[t.elementAttributeNameCase==="react"&&r.space?Z2t[r.property]||r.property:r.attribute,n]}}
function T6t(t,e){try{return u6t(e,{reactCompat:!0})}catch(n){if(t.ignoreInvalidStyle)return{};const r=n,i=new yu("Cannot parse `style` attribute",{ancestors:t.ancestors,cause:r,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw i.file=t.filePath||void 0,i.url=I4e+"#cannot-parse-style-attribute",i}}
function L4e(t,e,n){let r;if(!n)r={type:"Literal",value:e};else if(e.includes(".")){const i=e.split(".");let o=-1,s;for(;++o<i.length;){const a=Xle(i[o])?{type:"Identifier",name:i[o]}:{type:"Literal",value:i[o]};s=s?{type:"MemberExpression",object:s,property:a,computed:!!(o&&a.type==="Literal"),optional:!1}:a}r=s}else r=Xle(e)&&!/^[a-z]/.test(e)?{type:"Identifier",name:e}:{type:"Literal",value:e};if(r.type==="Literal"){const i=r.value;return mZ.call(t.components,i)?t.components[i]:i}if(t.evaluater)return t.evaluater.evaluateExpression(r);uE(t)}
function uE(t,e){const n=new yu("Cannot handle MDX estrees without `createEvaluater`",{ancestors:t.ancestors,place:e,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=t.filePath||void 0,n.url=I4e+"#cannot-handle-mdx-estrees-without-createevaluater",n}
function M6t(t){const e={};let n;for(n in t)mZ.call(t,n)&&(e[P6t(n)]=t[n]);return e}
function P6t(t){let e=t.replace(f6t,N6t);return e.slice(0,3)==="ms-"&&(e="-"+e),e}
function N6t(t){return"-"+t.toLowerCase()}
const Qj={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},R6t={};
function bZ(t,e){const n=R6t,r=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,i=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return B4e(t,r,i)}
function B4e(t,e,n){if(I6t(t)){if("value"in t)return t.type==="html"&&!n?"":t.value;if(e&&"alt"in t&&t.alt)return t.alt;if("children"in t)return oce(t.children,e,n)}return Array.isArray(t)?oce(t,e,n):""}
function oce(t,e,n){const r=[];let i=-1;for(;++i<t.length;)r[i]=B4e(t[i],e,n);return r.join("")}
function I6t(t){return!!(t&&typeof t=="object")}
const sce=document.createElement("i");
function vZ(t){const e="&"+t+";";sce.innerHTML=e;const n=sce.textContent;return n.charCodeAt(n.length-1)===59&&t!=="semi"||n===e?!1:n}
function Yh(t,e,n,r){const i=t.length;let o=0,s;if(e<0?e=-e>i?0:i+e:e=e>i?i:e,n=n>0?n:0,r.length<1e4)s=Array.from(r),s.unshift(e,n),t.splice(...s);else for(n&&t.splice(e,n);o<r.length;)s=r.slice(o,o+1e4),s.unshift(e,0),t.splice(...s),o+=1e4,e+=1e4}
function Vf(t,e){return t.length>0?(Yh(t,t.length,0,e),t):e}
const ace={}.hasOwnProperty;
function F4e(t){const e={};let n=-1;for(;++n<t.length;)O6t(e,t[n]);return e}
function O6t(t,e){let n;for(n in e){const i=(ace.call(t,n)?t[n]:void 0)||(t[n]={}),o=e[n];let s;if(o)for(s in o){ace.call(i,s)||(i[s]=[]);const a=o[s];D6t(i[s],Array.isArray(a)?a:a?[a]:[])}}}
function D6t(t,e){let n=-1;const r=[];for(;++n<e.length;)(e[n].add==="after"?t:r).push(e[n]);Yh(t,0,0,r)}
function j4e(t,e){const n=Number.parseInt(t,e);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}
function hm(t){return t.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}
const qu=_v(/[A-Za-z]/),au=_v(/[\dA-Za-z]/),L6t=_v(/[#-'*+\--9=?A-Z^-~]/);
function uR(t){return t!==null&&(t<32||t===127)}
const qV=_v(/\d/),B6t=_v(/[\dA-Fa-f]/),F6t=_v(/[!-/:-@[-`{-~]/);
function ur(t){return t!==null&&t<-2}
function hs(t){return t!==null&&(t<0||t===32)}
function Bi(t){return t===-2||t===-1||t===32}
const MO=_v(new RegExp("\\p{P}|\\p{S}","u")),d_=_v(/\s/);
function _v(t){return e;function e(n){return n!==null&&n>-1&&t.test(String.fromCharCode(n))}}
function p3(t){const e=[];let n=-1,r=0,i=0;for(;++n<t.length;){const o=t.charCodeAt(n);let s="";if(o===37&&au(t.charCodeAt(n+1))&&au(t.charCodeAt(n+2)))i=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(s=String.fromCharCode(o));else if(o>55295&&o<57344){const a=t.charCodeAt(n+1);o<56320&&a>56319&&a<57344?(s=String.fromCharCode(o,a),i=1):s="�"}else s=String.fromCharCode(o);s&&(e.push(t.slice(r,n),encodeURIComponent(s)),r=n+i+1,s=""),i&&(n+=i,i=0)}return e.join("")+t.slice(r)}
function ao(t,e,n,r){const i=r?r-1:Number.POSITIVE_INFINITY;let o=0;return s;function s(l){return Bi(l)?(t.enter(n),a(l)):e(l)}function a(l){return Bi(l)&&o++<i?(t.consume(l),a):(t.exit(n),e(l))}}
const j6t={tokenize:z6t};
function z6t(t){const e=t.attempt(this.parser.constructs.contentInitial,r,i);let n;return e;function r(a){if(a===null){t.consume(a);return}return t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),ao(t,e,"linePrefix")}function i(a){return t.enter("paragraph"),o(a)}function o(a){const l=t.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=l),n=l,s(a)}function s(a){if(a===null){t.exit("chunkText"),t.exit("paragraph"),t.consume(a);return}return ur(a)?(t.consume(a),t.exit("chunkText"),o):(t.consume(a),s)}}
const U6t={tokenize:G6t},lce={tokenize:H6t};
function G6t(t){const e=this,n=[];let r=0,i,o,s;return a;function a(A){if(r<n.length){const T=n[r];return e.containerState=T[1],t.attempt(T[0].continuation,l,c)(A)}return c(A)}function l(A){if(r++,e.containerState._closeFlow){e.containerState._closeFlow=void 0,i&&k();const T=e.events.length;let P=T,R;for(;P--;)if(e.events[P][0]==="exit"&&e.events[P][1].type==="chunkFlow"){R=e.events[P][1].end;break}w(r);let B=T;for(;B<e.events.length;)e.events[B][1].end={...R},B++;return Yh(e.events,P+1,0,e.events.slice(T)),e.events.length=B,c(A)}return a(A)}function c(A){if(r===n.length){if(!i)return h(A);if(i.currentConstruct&&i.currentConstruct.concrete)return g(A);e.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return e.containerState={},t.check(lce,u,d)(A)}function u(A){return i&&k(),w(r),h(A)}function d(A){return e.parser.lazy[e.now().line]=r!==n.length,s=e.now().offset,g(A)}function h(A){return e.containerState={},t.attempt(lce,p,g)(A)}function p(A){return r++,n.push([e.currentConstruct,e.containerState]),h(A)}function g(A){if(A===null){i&&k(),w(0),t.consume(A);return}return i=i||e.parser.flow(e.now()),t.enter("chunkFlow",{_tokenizer:i,contentType:"flow",previous:o}),b(A)}function b(A){if(A===null){v(t.exit("chunkFlow"),!0),w(0),t.consume(A);return}return ur(A)?(t.consume(A),v(t.exit("chunkFlow")),r=0,e.interrupt=void 0,a):(t.consume(A),b)}function v(A,T){const P=e.sliceStream(A);if(T&&P.push(null),A.previous=o,o&&(o.next=A),o=A,i.defineSkip(A.start),i.write(P),e.parser.lazy[A.start.line]){let R=i.events.length;for(;R--;)if(i.events[R][1].start.offset<s&&(!i.events[R][1].end||i.events[R][1].end.offset>s))return;const B=e.events.length;let j=B,I,L;for(;j--;)if(e.events[j][0]==="exit"&&e.events[j][1].type==="chunkFlow"){if(I){L=e.events[j][1].end;break}I=!0}for(w(r),R=B;R<e.events.length;)e.events[R][1].end={...L},R++;Yh(e.events,j+1,0,e.events.slice(B)),e.events.length=R}}function w(A){let T=n.length;for(;T-- >A;){const P=n[T];e.containerState=P[1],P[0].exit.call(e,t)}n.length=A}function k(){i.write([null]),o=void 0,i=void 0,e.containerState._closeFlow=void 0}}
function H6t(t,e,n){return ao(t,t.attempt(this.parser.constructs.document,e,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}
function y5(t){if(t===null||hs(t)||d_(t))return 1;if(MO(t))return 2}
function PO(t,e,n){const r=[];let i=-1;for(;++i<t.length;){const o=t[i].resolveAll;o&&!r.includes(o)&&(e=o(e,n),r.push(o))}return e}
const WV={name:"attention",resolveAll:V6t,tokenize:q6t};
function V6t(t,e){let n=-1,r,i,o,s,a,l,c,u;for(;++n<t.length;)if(t[n][0]==="enter"&&t[n][1].type==="attentionSequence"&&t[n][1]._close){for(r=n;r--;)if(t[r][0]==="exit"&&t[r][1].type==="attentionSequence"&&t[r][1]._open&&e.sliceSerialize(t[r][1]).charCodeAt(0)===e.sliceSerialize(t[n][1]).charCodeAt(0)){if((t[r][1]._close||t[n][1]._open)&&(t[n][1].end.offset-t[n][1].start.offset)%3&&!((t[r][1].end.offset-t[r][1].start.offset+t[n][1].end.offset-t[n][1].start.offset)%3))continue;l=t[r][1].end.offset-t[r][1].start.offset>1&&t[n][1].end.offset-t[n][1].start.offset>1?2:1;const d={...t[r][1].end},h={...t[n][1].start};cce(d,-l),cce(h,l),s={type:l>1?"strongSequence":"emphasisSequence",start:d,end:{...t[r][1].end}},a={type:l>1?"strongSequence":"emphasisSequence",start:{...t[n][1].start},end:h},o={type:l>1?"strongText":"emphasisText",start:{...t[r][1].end},end:{...t[n][1].start}},i={type:l>1?"strong":"emphasis",start:{...s.start},end:{...a.end}},t[r][1].end={...s.start},t[n][1].start={...a.end},c=[],t[r][1].end.offset-t[r][1].start.offset&&(c=Vf(c,[["enter",t[r][1],e],["exit",t[r][1],e]])),c=Vf(c,[["enter",i,e],["enter",s,e],["exit",s,e],["enter",o,e]]),c=Vf(c,PO(e.parser.constructs.insideSpan.null,t.slice(r+1,n),e)),c=Vf(c,[["exit",o,e],["enter",a,e],["exit",a,e],["exit",i,e]]),t[n][1].end.offset-t[n][1].start.offset?(u=2,c=Vf(c,[["enter",t[n][1],e],["exit",t[n][1],e]])):u=0,Yh(t,r-1,n-r+3,c),n=r+c.length-u-2;break}}for(n=-1;++n<t.length;)t[n][1].type==="attentionSequence"&&(t[n][1].type="data");return t}
function q6t(t,e){const n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=y5(r);let o;return s;function s(l){return o=l,t.enter("attentionSequence"),a(l)}function a(l){if(l===o)return t.consume(l),a;const c=t.exit("attentionSequence"),u=y5(l),d=!u||u===2&&i||n.includes(l),h=!i||i===2&&u||n.includes(r);return c._open=!!(o===42?d:d&&(i||!h)),c._close=!!(o===42?h:h&&(u||!d)),e(l)}}
function cce(t,e){t.column+=e,t.offset+=e,t._bufferIndex+=e}
const W6t={name:"autolink",tokenize:$6t};
function $6t(t,e,n){let r=0;return i;function i(p){return t.enter("autolink"),t.enter("autolinkMarker"),t.consume(p),t.exit("autolinkMarker"),t.enter("autolinkProtocol"),o}function o(p){return qu(p)?(t.consume(p),s):p===64?n(p):c(p)}function s(p){return p===43||p===45||p===46||au(p)?(r=1,a(p)):c(p)}function a(p){return p===58?(t.consume(p),r=0,l):(p===43||p===45||p===46||au(p))&&r++<32?(t.consume(p),a):(r=0,c(p))}function l(p){return p===62?(t.exit("autolinkProtocol"),t.enter("autolinkMarker"),t.consume(p),t.exit("autolinkMarker"),t.exit("autolink"),e):p===null||p===32||p===60||uR(p)?n(p):(t.consume(p),l)}function c(p){return p===64?(t.consume(p),u):L6t(p)?(t.consume(p),c):n(p)}function u(p){return au(p)?d(p):n(p)}function d(p){return p===46?(t.consume(p),r=0,u):p===62?(t.exit("autolinkProtocol").type="autolinkEmail",t.enter("autolinkMarker"),t.consume(p),t.exit("autolinkMarker"),t.exit("autolink"),e):h(p)}function h(p){if((p===45||au(p))&&r++<63){const g=p===45?h:d;return t.consume(p),g}return n(p)}}
const _8={partial:!0,tokenize:Y6t};
function Y6t(t,e,n){return r;function r(o){return Bi(o)?ao(t,i,"linePrefix")(o):i(o)}function i(o){return o===null||ur(o)?e(o):n(o)}}
const z4e={continuation:{tokenize:K6t},exit:Z6t,name:"blockQuote",tokenize:X6t};
function X6t(t,e,n){const r=this;return i;function i(s){if(s===62){const a=r.containerState;return a.open||(t.enter("blockQuote",{_container:!0}),a.open=!0),t.enter("blockQuotePrefix"),t.enter("blockQuoteMarker"),t.consume(s),t.exit("blockQuoteMarker"),o}return n(s)}function o(s){return Bi(s)?(t.enter("blockQuotePrefixWhitespace"),t.consume(s),t.exit("blockQuotePrefixWhitespace"),t.exit("blockQuotePrefix"),e):(t.exit("blockQuotePrefix"),e(s))}}
function K6t(t,e,n){const r=this;return i;function i(s){return Bi(s)?ao(t,o,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s):o(s)}function o(s){return t.attempt(z4e,e,n)(s)}}
function Z6t(t){t.exit("blockQuote")}
const U4e={name:"characterEscape",tokenize:J6t};
function J6t(t,e,n){return r;function r(o){return t.enter("characterEscape"),t.enter("escapeMarker"),t.consume(o),t.exit("escapeMarker"),i}function i(o){return F6t(o)?(t.enter("characterEscapeValue"),t.consume(o),t.exit("characterEscapeValue"),t.exit("characterEscape"),e):n(o)}}
const G4e={name:"characterReference",tokenize:Q6t};
function Q6t(t,e,n){const r=this;let i=0,o,s;return a;function a(d){return t.enter("characterReference"),t.enter("characterReferenceMarker"),t.consume(d),t.exit("characterReferenceMarker"),l}function l(d){return d===35?(t.enter("characterReferenceMarkerNumeric"),t.consume(d),t.exit("characterReferenceMarkerNumeric"),c):(t.enter("characterReferenceValue"),o=31,s=au,u(d))}function c(d){return d===88||d===120?(t.enter("characterReferenceMarkerHexadecimal"),t.consume(d),t.exit("characterReferenceMarkerHexadecimal"),t.enter("characterReferenceValue"),o=6,s=B6t,u):(t.enter("characterReferenceValue"),o=7,s=qV,u(d))}function u(d){if(d===59&&i){const h=t.exit("characterReferenceValue");return s===au&&!vZ(r.sliceSerialize(h))?n(d):(t.enter("characterReferenceMarker"),t.consume(d),t.exit("characterReferenceMarker"),t.exit("characterReference"),e)}return s(d)&&i++<o?(t.consume(d),u):n(d)}}
const uce={partial:!0,tokenize:tSt},dce={concrete:!0,name:"codeFenced",tokenize:eSt};
function eSt(t,e,n){const r=this,i={partial:!0,tokenize:P};let o=0,s=0,a;return l;function l(R){return c(R)}function c(R){const B=r.events[r.events.length-1];return o=B&&B[1].type==="linePrefix"?B[2].sliceSerialize(B[1],!0).length:0,a=R,t.enter("codeFenced"),t.enter("codeFencedFence"),t.enter("codeFencedFenceSequence"),u(R)}function u(R){return R===a?(s++,t.consume(R),u):s<3?n(R):(t.exit("codeFencedFenceSequence"),Bi(R)?ao(t,d,"whitespace")(R):d(R))}function d(R){return R===null||ur(R)?(t.exit("codeFencedFence"),r.interrupt?e(R):t.check(uce,b,T)(R)):(t.enter("codeFencedFenceInfo"),t.enter("chunkString",{contentType:"string"}),h(R))}function h(R){return R===null||ur(R)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),d(R)):Bi(R)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),ao(t,p,"whitespace")(R)):R===96&&R===a?n(R):(t.consume(R),h)}function p(R){return R===null||ur(R)?d(R):(t.enter("codeFencedFenceMeta"),t.enter("chunkString",{contentType:"string"}),g(R))}function g(R){return R===null||ur(R)?(t.exit("chunkString"),t.exit("codeFencedFenceMeta"),d(R)):R===96&&R===a?n(R):(t.consume(R),g)}function b(R){return t.attempt(i,T,v)(R)}function v(R){return t.enter("lineEnding"),t.consume(R),t.exit("lineEnding"),w}function w(R){return o>0&&Bi(R)?ao(t,k,"linePrefix",o+1)(R):k(R)}function k(R){return R===null||ur(R)?t.check(uce,b,T)(R):(t.enter("codeFlowValue"),A(R))}function A(R){return R===null||ur(R)?(t.exit("codeFlowValue"),k(R)):(t.consume(R),A)}function T(R){return t.exit("codeFenced"),e(R)}function P(R,B,j){let I=0;return L;function L(W){return R.enter("lineEnding"),R.consume(W),R.exit("lineEnding"),N}function N(W){return R.enter("codeFencedFence"),Bi(W)?ao(R,z,"linePrefix",r.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(W):z(W)}function z(W){return W===a?(R.enter("codeFencedFenceSequence"),G(W)):j(W)}function G(W){return W===a?(I++,R.consume(W),G):I>=s?(R.exit("codeFencedFenceSequence"),Bi(W)?ao(R,K,"whitespace")(W):K(W)):j(W)}function K(W){return W===null||ur(W)?(R.exit("codeFencedFence"),B(W)):j(W)}}}
function tSt(t,e,n){const r=this;return i;function i(s){return s===null?n(s):(t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),o)}function o(s){return r.parser.lazy[r.now().line]?n(s):e(s)}}
const ez={name:"codeIndented",tokenize:rSt},nSt={partial:!0,tokenize:iSt};
function rSt(t,e,n){const r=this;return i;function i(c){return t.enter("codeIndented"),ao(t,o,"linePrefix",5)(c)}function o(c){const u=r.events[r.events.length-1];return u&&u[1].type==="linePrefix"&&u[2].sliceSerialize(u[1],!0).length>=4?s(c):n(c)}function s(c){return c===null?l(c):ur(c)?t.attempt(nSt,s,l)(c):(t.enter("codeFlowValue"),a(c))}function a(c){return c===null||ur(c)?(t.exit("codeFlowValue"),s(c)):(t.consume(c),a)}function l(c){return t.exit("codeIndented"),e(c)}}
function iSt(t,e,n){const r=this;return i;function i(s){return r.parser.lazy[r.now().line]?n(s):ur(s)?(t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),i):ao(t,o,"linePrefix",5)(s)}function o(s){const a=r.events[r.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?e(s):ur(s)?i(s):n(s)}}
const oSt={name:"codeText",previous:aSt,resolve:sSt,tokenize:lSt};
function sSt(t){let e=t.length-4,n=3,r,i;if((t[n][1].type==="lineEnding"||t[n][1].type==="space")&&(t[e][1].type==="lineEnding"||t[e][1].type==="space")){for(r=n;++r<e;)if(t[r][1].type==="codeTextData"){t[n][1].type="codeTextPadding",t[e][1].type="codeTextPadding",n+=2,e-=2;break}}for(r=n-1,e++;++r<=e;)i===void 0?r!==e&&t[r][1].type!=="lineEnding"&&(i=r):(r===e||t[r][1].type==="lineEnding")&&(t[i][1].type="codeTextData",r!==i+2&&(t[i][1].end=t[r-1][1].end,t.splice(i+2,r-i-2),e-=r-i-2,r=i+2),i=void 0);return t}
function aSt(t){return t!==96||this.events[this.events.length-1][1].type==="characterEscape"}
function lSt(t,e,n){let r=0,i,o;return s;function s(d){return t.enter("codeText"),t.enter("codeTextSequence"),a(d)}function a(d){return d===96?(t.consume(d),r++,a):(t.exit("codeTextSequence"),l(d))}function l(d){return d===null?n(d):d===32?(t.enter("space"),t.consume(d),t.exit("space"),l):d===96?(o=t.enter("codeTextSequence"),i=0,u(d)):ur(d)?(t.enter("lineEnding"),t.consume(d),t.exit("lineEnding"),l):(t.enter("codeTextData"),c(d))}function c(d){return d===null||d===32||d===96||ur(d)?(t.exit("codeTextData"),l(d)):(t.consume(d),c)}function u(d){return d===96?(t.consume(d),i++,u):i===r?(t.exit("codeTextSequence"),t.exit("codeText"),e(d)):(o.type="codeTextData",c(d))}}
class cSt{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,n){const r=n??Number.POSITIVE_INFINITY;return r<this.left.length?this.left.slice(e,r):e>this.left.length?this.right.slice(this.right.length-r+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-r+this.left.length).reverse())}splice(e,n,r){const i=n||0;this.setCursor(Math.trunc(e));const o=this.right.splice(this.right.length-i,Number.POSITIVE_INFINITY);return r&&D4(this.left,r),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),D4(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),D4(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){const n=this.left.splice(e,Number.POSITIVE_INFINITY);D4(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);D4(this.left,n.reverse())}}}
function D4(t,e){let n=0;if(e.length<1e4)t.push(...e);else for(;n<e.length;)t.push(...e.slice(n,n+1e4)),n+=1e4}
function H4e(t){const e={};let n=-1,r,i,o,s,a,l,c;const u=new cSt(t);for(;++n<u.length;){for(;n in e;)n=e[n];if(r=u.get(n),n&&r[1].type==="chunkFlow"&&u.get(n-1)[1].type==="listItemPrefix"&&(l=r[1]._tokenizer.events,o=0,o<l.length&&l[o][1].type==="lineEndingBlank"&&(o+=2),o<l.length&&l[o][1].type==="content"))for(;++o<l.length&&l[o][1].type!=="content";)l[o][1].type==="chunkText"&&(l[o][1]._isInFirstContentOfListItem=!0,o++);if(r[0]==="enter")r[1].contentType&&(Object.assign(e,uSt(u,n)),n=e[n],c=!0);else if(r[1]._container){for(o=n,i=void 0;o--;)if(s=u.get(o),s[1].type==="lineEnding"||s[1].type==="lineEndingBlank")s[0]==="enter"&&(i&&(u.get(i)[1].type="lineEndingBlank"),s[1].type="lineEnding",i=o);else if(!(s[1].type==="linePrefix"||s[1].type==="listItemIndent"))break;i&&(r[1].end={...u.get(i)[1].start},a=u.slice(i,n),a.unshift(r),u.splice(i,n-i+1,a))}}return Yh(t,0,Number.POSITIVE_INFINITY,u.slice(0)),!c}
function uSt(t,e){const n=t.get(e)[1],r=t.get(e)[2];let i=e-1;const o=[];let s=n._tokenizer;s||(s=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(s._contentTypeTextTrailing=!0));const a=s.events,l=[],c={};let u,d,h=-1,p=n,g=0,b=0;const v=[b];for(;p;){for(;t.get(++i)[1]!==p;);o.push(i),p._tokenizer||(u=r.sliceStream(p),p.next||u.push(null),d&&s.defineSkip(p.start),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=!0),s.write(u),p._isInFirstContentOfListItem&&(s._gfmTasklistFirstContentOfListItem=void 0)),d=p,p=p.next}for(p=n;++h<a.length;)a[h][0]==="exit"&&a[h-1][0]==="enter"&&a[h][1].type===a[h-1][1].type&&a[h][1].start.line!==a[h][1].end.line&&(b=h+1,v.push(b),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(s.events=[],p?(p._tokenizer=void 0,p.previous=void 0):v.pop(),h=v.length;h--;){const w=a.slice(v[h],v[h+1]),k=o.pop();l.push([k,k+w.length-1]),t.splice(k,2,w)}for(l.reverse(),h=-1;++h<l.length;)c[g+l[h][0]]=g+l[h][1],g+=l[h][1]-l[h][0]-1;return c}
const dSt={resolve:fSt,tokenize:pSt},hSt={partial:!0,tokenize:mSt};
function fSt(t){return H4e(t),t}
function pSt(t,e){let n;return r;function r(a){return t.enter("content"),n=t.enter("chunkContent",{contentType:"content"}),i(a)}function i(a){return a===null?o(a):ur(a)?t.check(hSt,s,o)(a):(t.consume(a),i)}function o(a){return t.exit("chunkContent"),t.exit("content"),e(a)}function s(a){return t.consume(a),t.exit("chunkContent"),n.next=t.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,i}}
function mSt(t,e,n){const r=this;return i;function i(s){return t.exit("chunkContent"),t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),ao(t,o,"linePrefix")}function o(s){if(s===null||ur(s))return n(s);const a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?e(s):t.interrupt(r.parser.constructs.flow,n,e)(s)}}
function V4e(t,e,n,r,i,o,s,a,l){const c=l||Number.POSITIVE_INFINITY;let u=0;return d;function d(w){return w===60?(t.enter(r),t.enter(i),t.enter(o),t.consume(w),t.exit(o),h):w===null||w===32||w===41||uR(w)?n(w):(t.enter(r),t.enter(s),t.enter(a),t.enter("chunkString",{contentType:"string"}),b(w))}function h(w){return w===62?(t.enter(o),t.consume(w),t.exit(o),t.exit(i),t.exit(r),e):(t.enter(a),t.enter("chunkString",{contentType:"string"}),p(w))}function p(w){return w===62?(t.exit("chunkString"),t.exit(a),h(w)):w===null||w===60||ur(w)?n(w):(t.consume(w),w===92?g:p)}function g(w){return w===60||w===62||w===92?(t.consume(w),p):p(w)}function b(w){return!u&&(w===null||w===41||hs(w))?(t.exit("chunkString"),t.exit(a),t.exit(s),t.exit(r),e(w)):u<c&&w===40?(t.consume(w),u++,b):w===41?(t.consume(w),u--,b):w===null||w===32||w===40||uR(w)?n(w):(t.consume(w),w===92?v:b)}function v(w){return w===40||w===41||w===92?(t.consume(w),b):b(w)}}
function q4e(t,e,n,r,i,o){const s=this;let a=0,l;return c;function c(p){return t.enter(r),t.enter(i),t.consume(p),t.exit(i),t.enter(o),u}function u(p){return a>999||p===null||p===91||p===93&&!l||p===94&&!a&&"_hiddenFootnoteSupport"in s.parser.constructs?n(p):p===93?(t.exit(o),t.enter(i),t.consume(p),t.exit(i),t.exit(r),e):ur(p)?(t.enter("lineEnding"),t.consume(p),t.exit("lineEnding"),u):(t.enter("chunkString",{contentType:"string"}),d(p))}function d(p){return p===null||p===91||p===93||ur(p)||a++>999?(t.exit("chunkString"),u(p)):(t.consume(p),l||(l=!Bi(p)),p===92?h:d)}function h(p){return p===91||p===92||p===93?(t.consume(p),a++,d):d(p)}}
function W4e(t,e,n,r,i,o){let s;return a;function a(h){return h===34||h===39||h===40?(t.enter(r),t.enter(i),t.consume(h),t.exit(i),s=h===40?41:h,l):n(h)}function l(h){return h===s?(t.enter(i),t.consume(h),t.exit(i),t.exit(r),e):(t.enter(o),c(h))}function c(h){return h===s?(t.exit(o),l(s)):h===null?n(h):ur(h)?(t.enter("lineEnding"),t.consume(h),t.exit("lineEnding"),ao(t,c,"linePrefix")):(t.enter("chunkString",{contentType:"string"}),u(h))}function u(h){return h===s||h===null||ur(h)?(t.exit("chunkString"),c(h)):(t.consume(h),h===92?d:u)}function d(h){return h===s||h===92?(t.consume(h),u):u(h)}}
function aA(t,e){let n;return r;function r(i){return ur(i)?(t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),n=!0,r):Bi(i)?ao(t,r,n?"linePrefix":"lineSuffix")(i):e(i)}}
const gSt={name:"definition",tokenize:bSt},ySt={partial:!0,tokenize:vSt};
function bSt(t,e,n){const r=this;let i;return o;function o(p){return t.enter("definition"),s(p)}function s(p){return q4e.call(r,t,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function a(p){return i=hm(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),p===58?(t.enter("definitionMarker"),t.consume(p),t.exit("definitionMarker"),l):n(p)}function l(p){return hs(p)?aA(t,c)(p):c(p)}function c(p){return V4e(t,u,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function u(p){return t.attempt(ySt,d,d)(p)}function d(p){return Bi(p)?ao(t,h,"whitespace")(p):h(p)}function h(p){return p===null||ur(p)?(t.exit("definition"),r.parser.defined.push(i),e(p)):n(p)}}
function vSt(t,e,n){return r;function r(a){return hs(a)?aA(t,i)(a):n(a)}function i(a){return W4e(t,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function o(a){return Bi(a)?ao(t,s,"whitespace")(a):s(a)}function s(a){return a===null||ur(a)?e(a):n(a)}}
const wSt={name:"hardBreakEscape",tokenize:xSt};
function xSt(t,e,n){return r;function r(o){return t.enter("hardBreakEscape"),t.consume(o),i}function i(o){return ur(o)?(t.exit("hardBreakEscape"),e(o)):n(o)}}
const _St={name:"headingAtx",resolve:SSt,tokenize:kSt};
function SSt(t,e){let n=t.length-2,r=3,i,o;return t[r][1].type==="whitespace"&&(r+=2),n-2>r&&t[n][1].type==="whitespace"&&(n-=2),t[n][1].type==="atxHeadingSequence"&&(r===n-1||n-4>r&&t[n-2][1].type==="whitespace")&&(n-=r+1===n?2:4),n>r&&(i={type:"atxHeadingText",start:t[r][1].start,end:t[n][1].end},o={type:"chunkText",start:t[r][1].start,end:t[n][1].end,contentType:"text"},Yh(t,r,n-r+1,[["enter",i,e],["enter",o,e],["exit",o,e],["exit",i,e]])),t}

export { _2t, _4e, _6t, _8, _St, _v, _xt, $_t, $2t, $6t, $le, $wt, $xt, a_t, A_t, a2t, A2t, A4e, a6t, A6t, aA, ace, ai, ao, AO, aSt, au, axt, Axt, aZ, b_t, B_t, b2t, B2t, b4e, B4e, b6t, B6t, Bi, bSt, BV, bxt, Bxt, bZ, c_t, C_t, c2t, C2t, c4e, C4e, C6, c6t, C6t, cce, cE, cR, cSt, cxt, Cxt, cZ, d_, D_, d_t, D_t, d2t, D2t, D4, d4e, D4e, d6t, D6t, dce, dSt, dxt, Dxt, dZ, e_t, E_t, e2t, E2t, E4e, e6t, E6t, ece, ef, EO, eSt, ext, Ext, ez, f_t, F_t, f2t, F2t, f3, f4e, F4e, f6t, F6t, fSt, fxt, Fxt, fZ, g_t, G_t, g2t, G2t, g4e, G4e, g6t, G6t, Gle, gSt, GV, Gwt, gxt, Gxt, gZ, h_t, H_t, h2t, H2t, h3, h4e, H4e, h6t, H6t, Hle, hm, hs, hSt, HV, Hwt, hxt, Hxt, hZ, i_t, I_t, i2t, I2t, I4, I4e, i6t, I6t, ice, iSt, ixt, Ixt, iZ, j_t, J_t, j2t, J2t, j4e, j6t, J6t, Jj, Jle, Jt, jV, jwt, jxt, Jxt, jy, k_t, K_t, k2t, K2t, k4e, k6t, K6t, Kj, Kle, Kwt, kxt, Kxt, L_, l_t, L_t, l2t, L2t, L4e, l6t, L6t, lce, lE, lh, lS, lSt, LV, lxt, Lxt, lZ, m_t, M_t, m2t, M2t, M4e, m6t, M6t, MO, MS, mSt, mxt, Mxt, mZ, n_t, N_t, n2t, N2t, N4e, n6t, N6t, nce, NP, nSt, nxt, Nxt, O_, o_t, O_t, o2t, O2t, O4, O4e, o6t, O6t, oce, oSt, oxt, Oxt, oZ, p_t, P_t, p2t, P2t, p3, p4e, P4e, p6t, P6t, PO, PS, pSt, pxt, Pxt, pZ, q_t, Q_t, q2t, Q2t, q4e, q6t, Q6t, Qj, qle, Qle, qu, qV, qwt, qxt, Qxt, r_t, R_t, r2t, R2t, R4e, r6t, R6t, rce, Rh, rn, rSt, rxt, Rxt, rZ, s_t, S_t, s2t, S2t, S4e, s6t, S6t, sA, sce, Ss, sSt, SSt, sxt, Sxt, sZ, t_t, T_t, t2t, T2t, T4e, t6t, T6t, tce, TO, tSt, txt, Txt, u_, u_t, U_t, u2t, U2t, u4e, U4e, u6t, U6t, uce, uE, Ule, ur, uR, uSt, UV, Uwt, uxt, Uxt, uZ, v_t, V_t, v2t, V2t, v4e, V4e, v6t, V6t, Vd, Vf, Vle, vSt, VV, Vwt, vxt, Vxt, vZ, w_t, W_t, w2t, W2t, w4e, W4e, w6t, W6t, Wle, wSt, WV, Wwt, wxt, Wxt, x_t, X_t, x2t, X2t, x4e, x6t, X6t, x8, Xj, Xle, xSt, Xwt, xxt, Xxt, y_t, Y_t, y2t, Y2t, y4e, y5, y6t, Y6t, Yh, yl, Yle, ySt, yu, Ywt, yxt, Yxt, yZ, z_t, Z_t, z2t, Z2t, z4e, z6t, Z6t, Zj, Zle, zV, zwt, zxt, Zxt }
