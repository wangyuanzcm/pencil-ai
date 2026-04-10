export type BundleExport = { exported: string; local: string }

export const bundleExports: BundleExport[] = [
  {
    "local": "DRt",
    "exported": "$"
  },
  {
    "local": "JUe",
    "exported": "A"
  },
  {
    "local": "Bxe",
    "exported": "B"
  },
  {
    "local": "la",
    "exported": "C"
  },
  {
    "local": "E1e",
    "exported": "D"
  },
  {
    "local": "P1e",
    "exported": "E"
  },
  {
    "local": "KVe",
    "exported": "F"
  },
  {
    "local": "zwe",
    "exported": "G"
  },
  {
    "local": "Xxe",
    "exported": "H"
  },
  {
    "local": "U7e",
    "exported": "I"
  },
  {
    "local": "ql",
    "exported": "J"
  },
  {
    "local": "Wg",
    "exported": "K"
  },
  {
    "local": "dv",
    "exported": "L"
  },
  {
    "local": "rxe",
    "exported": "M"
  },
  {
    "local": "xxe",
    "exported": "N"
  },
  {
    "local": "rIt",
    "exported": "O"
  },
  {
    "local": "qg",
    "exported": "P"
  },
  {
    "local": "NR",
    "exported": "Q"
  },
  {
    "local": "Bye",
    "exported": "R"
  },
  {
    "local": "dIt",
    "exported": "S"
  },
  {
    "local": "h9",
    "exported": "T"
  },
  {
    "local": "zq",
    "exported": "U"
  },
  {
    "local": "PKt",
    "exported": "V"
  },
  {
    "local": "tde",
    "exported": "W"
  },
  {
    "local": "_7e",
    "exported": "X"
  },
  {
    "local": "V6",
    "exported": "Y"
  },
  {
    "local": "pIt",
    "exported": "Z"
  },
  {
    "local": "bIt",
    "exported": "_"
  },
  {
    "local": "QUe",
    "exported": "a"
  },
  {
    "local": "Qu",
    "exported": "b"
  },
  {
    "local": "Av",
    "exported": "c"
  },
  {
    "local": "z_",
    "exported": "d"
  },
  {
    "local": "Ko",
    "exported": "e"
  },
  {
    "local": "LJ",
    "exported": "f"
  },
  {
    "local": "Fye",
    "exported": "g"
  },
  {
    "local": "K$",
    "exported": "h"
  },
  {
    "local": "dxe",
    "exported": "i"
  },
  {
    "local": "hxe",
    "exported": "j"
  },
  {
    "local": "n_e",
    "exported": "k"
  },
  {
    "local": "t_e",
    "exported": "l"
  },
  {
    "local": "zxe",
    "exported": "m"
  },
  {
    "local": "Pxe",
    "exported": "n"
  },
  {
    "local": "K1e",
    "exported": "o"
  },
  {
    "local": "Y1e",
    "exported": "p"
  },
  {
    "local": "BJ",
    "exported": "q"
  },
  {
    "local": "XRt",
    "exported": "r"
  },
  {
    "local": "Vy",
    "exported": "s"
  },
  {
    "local": "RRt",
    "exported": "t"
  },
  {
    "local": "F1",
    "exported": "u"
  },
  {
    "local": "M5",
    "exported": "v"
  },
  {
    "local": "X1",
    "exported": "w"
  },
  {
    "local": "qRt",
    "exported": "x"
  },
  {
    "local": "zl",
    "exported": "y"
  },
  {
    "local": "qs",
    "exported": "z"
  }
] as const

export function getLocalName(exported: string) {
  return bundleExports.find(e => e.exported === exported)?.local ?? null
}
