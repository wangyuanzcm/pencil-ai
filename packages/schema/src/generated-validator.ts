export type ValidationError = { path: string; message: string };

export type ValidationContext = { errors: ValidationError[]; partial: boolean; transform?: (tag: string, value: unknown) => unknown };

export function validate_variable(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "string") {
    ctx.errors.push({ path: path, message: "expected \"$variable\"" + ", got " + JSON.stringify(v) });
  } else if (!_re0.test(v)) {
    ctx.errors.push({ path: path, message: "expected \"$variable\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_booleanOrVariable(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v === "string") {
    const _v0: ValidationContext = { errors: [], partial: ctx.partial };
    let _v1 = false;
    if (!_v1) {
      const _v2: ValidationContext = { errors: [], partial: _v0.partial };
      validate_variable(v, _v2, path);
      if (_v2.errors.length === 0) _v1 = true;
    }
    if (!_v1) {
      _v0.errors.push({ path: path, message: "expected one of: \"$variable\"" + ", got " + JSON.stringify(v) });
    }
    if (_v0.errors.length > 0) {
      ctx.errors.push({ path: path, message: "expected either boolean or \"$variable\"" + ", got " + JSON.stringify(v) });
    }
  } else if (!(typeof v === "boolean")) {
    ctx.errors.push({ path: path, message: "expected either boolean or \"$variable\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_theme(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v3 = v as Record<string, unknown>;
    for (const _v4 of Object.keys(_v3)) {
      if (typeof _v3[_v4] !== "string") {
        ctx.errors.push({ path: path + "/" + _v4, message: "expected string" + ", got " + JSON.stringify(_v3[_v4]) });
      }
    }
  }
}

export function validate_color(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "string") {
    ctx.errors.push({ path: path, message: "expected color hex string (#RRGGBBAA, #RRGGBB or #RGB)" + ", got " + JSON.stringify(v) });
  } else if (!_re1.test(v)) {
    ctx.errors.push({ path: path, message: "expected color hex string (#RRGGBBAA, #RRGGBB or #RGB)" + ", got " + JSON.stringify(v) });
  }
}

export function validate_colorOrVariable(v: unknown, ctx: ValidationContext, path: string): void {
  let _v5 = false;
  if (!_v5) {
    const _v6: ValidationContext = { errors: [], partial: ctx.partial };
    validate_color(v, _v6, path);
    if (_v6.errors.length === 0) _v5 = true;
  }
  if (!_v5) {
    const _v7: ValidationContext = { errors: [], partial: ctx.partial };
    validate_variable(v, _v7, path);
    if (_v7.errors.length === 0) _v5 = true;
  }
  if (!_v5) {
    ctx.errors.push({ path: path, message: "expected either color hex string (#RRGGBBAA, #RRGGBB or #RGB) or \"$variable\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_numberOrVariable(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v === "string") {
    const _v8: ValidationContext = { errors: [], partial: ctx.partial };
    let _v9 = false;
    if (!_v9) {
      const _v10: ValidationContext = { errors: [], partial: _v8.partial };
      validate_variable(v, _v10, path);
      if (_v10.errors.length === 0) _v9 = true;
    }
    if (!_v9) {
      _v8.errors.push({ path: path, message: "expected one of: \"$variable\"" + ", got " + JSON.stringify(v) });
    }
    if (_v8.errors.length > 0) {
      ctx.errors.push({ path: path, message: "expected either number or \"$variable\"" + ", got " + JSON.stringify(v) });
    }
  } else if (!(typeof v === "number")) {
    ctx.errors.push({ path: path, message: "expected either number or \"$variable\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_stringOrVariable(v: unknown, ctx: ValidationContext, path: string): void {
  let _v11 = false;
  if (!_v11) {
    const _v12: ValidationContext = { errors: [], partial: ctx.partial };
    if (typeof v !== "string") {
      _v12.errors.push({ path: path, message: "expected string" + ", got " + JSON.stringify(v) });
    }
    if (_v12.errors.length === 0) _v11 = true;
  }
  if (!_v11) {
    const _v13: ValidationContext = { errors: [], partial: ctx.partial };
    validate_variable(v, _v13, path);
    if (_v13.errors.length === 0) _v11 = true;
  }
  if (!_v11) {
    ctx.errors.push({ path: path, message: "expected either string or \"$variable\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_position(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v14 = v as Record<string, unknown>;
    if (_v14["x"] !== undefined) {
      if (typeof _v14["x"] !== "number") {
        ctx.errors.push({ path: path + "/x", message: "expected number" + ", got " + JSON.stringify(_v14["x"]) });
      }
    }
    if (_v14["y"] !== undefined) {
      if (typeof _v14["y"] !== "number") {
        ctx.errors.push({ path: path + "/y", message: "expected number" + ", got " + JSON.stringify(_v14["y"]) });
      }
    }
  }
}

export function validate_canHaveRotation(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v15 = v as Record<string, unknown>;
    if (_v15["rotation"] !== undefined) {
      validate_numberOrVariable(_v15["rotation"], ctx, path + "/rotation");
    }
  }
}

export function validate_entity(v: unknown, ctx: ValidationContext, path: string): void {
  validate_position(v, ctx, path);
  validate_canHaveRotation(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v16 = v as Record<string, unknown>;
    if (!ctx.partial && !("id" in _v16)) {
      ctx.errors.push({ path: path + "/id", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v16["id"] !== undefined) {
      if (typeof _v16["id"] !== "string") {
        ctx.errors.push({ path: path + "/id", message: "expected string without slashes" + ", got " + JSON.stringify(_v16["id"]) });
      } else if (!_re2.test(_v16["id"])) {
        ctx.errors.push({ path: path + "/id", message: "expected string without slashes" + ", got " + JSON.stringify(_v16["id"]) });
      }
    }
    if (_v16["name"] !== undefined) {
      if (typeof _v16["name"] !== "string") {
        ctx.errors.push({ path: path + "/name", message: "expected string" + ", got " + JSON.stringify(_v16["name"]) });
      }
    }
    if (_v16["context"] !== undefined) {
      if (typeof _v16["context"] !== "string") {
        ctx.errors.push({ path: path + "/context", message: "expected string" + ", got " + JSON.stringify(_v16["context"]) });
      }
    }
    if (_v16["reusable"] !== undefined) {
      if (typeof _v16["reusable"] !== "boolean") {
        ctx.errors.push({ path: path + "/reusable", message: "expected boolean" + ", got " + JSON.stringify(_v16["reusable"]) });
      }
    }
    if (_v16["theme"] !== undefined) {
      validate_theme(_v16["theme"], ctx, path + "/theme");
    }
    if (_v16["enabled"] !== undefined) {
      validate_booleanOrVariable(_v16["enabled"], ctx, path + "/enabled");
    }
    if (_v16["opacity"] !== undefined) {
      validate_numberOrVariable(_v16["opacity"], ctx, path + "/opacity");
    }
    if (_v16["flipX"] !== undefined) {
      validate_booleanOrVariable(_v16["flipX"], ctx, path + "/flipX");
    }
    if (_v16["flipY"] !== undefined) {
      validate_booleanOrVariable(_v16["flipY"], ctx, path + "/flipY");
    }
    if (_v16["layoutPosition"] !== undefined) {
      if (_v16["layoutPosition"] !== "auto" && _v16["layoutPosition"] !== "absolute") {
        ctx.errors.push({ path: path + "/layoutPosition", message: "expected one of: \"auto\", \"absolute\"" + ", got " + JSON.stringify(_v16["layoutPosition"]) });
      }
    }
    if (_v16["metadata"] !== undefined) {
      if (typeof _v16["metadata"] !== "object" || _v16["metadata"] === null) {
        ctx.errors.push({ path: path + "/metadata", message: "expected object" + ", got " + JSON.stringify(_v16["metadata"]) });
      } else {
        const _v17 = _v16["metadata"] as Record<string, unknown>;
        if (!ctx.partial && !("type" in _v17)) {
          ctx.errors.push({ path: path + "/metadata" + "/type", message: "missing required property" + ", got " + JSON.stringify(_v16["metadata"]) });
        } else if (_v17["type"] !== undefined) {
          if (typeof _v17["type"] !== "string") {
            ctx.errors.push({ path: path + "/metadata" + "/type", message: "expected string" + ", got " + JSON.stringify(_v17["type"]) });
          }
        }
      }
    }
  }
}

export function validate_sizingBehavior(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "string") {
    ctx.errors.push({ path: path, message: "expected sizing behavior (fit_content or fill_container, with optional fallback size like fit_content(100))" + ", got " + JSON.stringify(v) });
  } else if (!_re3.test(v)) {
    ctx.errors.push({ path: path, message: "expected sizing behavior (fit_content or fill_container, with optional fallback size like fit_content(100))" + ", got " + JSON.stringify(v) });
  }
}

export function validate_size(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v18 = v as Record<string, unknown>;
    if (_v18["width"] !== undefined) {
      const _v19: ValidationContext = { errors: [], partial: ctx.partial };
      let _v20 = false;
      if (!_v20) {
        const _v21: ValidationContext = { errors: [], partial: _v19.partial };
        validate_numberOrVariable(_v18["width"], _v21, path + "/width");
        if (_v21.errors.length === 0) _v20 = true;
      }
      if (!_v20) {
        const _v22: ValidationContext = { errors: [], partial: _v19.partial };
        validate_sizingBehavior(_v18["width"], _v22, path + "/width");
        if (_v22.errors.length === 0) _v20 = true;
      }
      if (!_v20) {
        _v19.errors.push({ path: path + "/width", message: "expected one of: number, \"$variable\", sizing behavior (fit_content or fill_container, with optional fallback size like fit_content(100))" + ", got " + JSON.stringify(_v18["width"]) });
      }
      if (_v19.errors.length > 0 && ctx.transform) {
        const _v23 = ctx.transform("sizingBehavior", _v18["width"]);
        if (_v23 !== undefined) _v18["width"] = _v23;
        let _v24 = false;
        if (!_v24) {
          const _v25: ValidationContext = { errors: [], partial: ctx.partial };
          validate_numberOrVariable(_v18["width"], _v25, path + "/width");
          if (_v25.errors.length === 0) _v24 = true;
        }
        if (!_v24) {
          const _v26: ValidationContext = { errors: [], partial: ctx.partial };
          validate_sizingBehavior(_v18["width"], _v26, path + "/width");
          if (_v26.errors.length === 0) _v24 = true;
        }
        if (!_v24) {
          ctx.errors.push({ path: path + "/width", message: "expected one of: number, \"$variable\", sizing behavior (fit_content or fill_container, with optional fallback size like fit_content(100))" + ", got " + JSON.stringify(_v18["width"]) });
        }
      } else {
        for (const _e of _v19.errors) ctx.errors.push(_e);
      }
    }
    if (_v18["height"] !== undefined) {
      const _v27: ValidationContext = { errors: [], partial: ctx.partial };
      let _v28 = false;
      if (!_v28) {
        const _v29: ValidationContext = { errors: [], partial: _v27.partial };
        validate_numberOrVariable(_v18["height"], _v29, path + "/height");
        if (_v29.errors.length === 0) _v28 = true;
      }
      if (!_v28) {
        const _v30: ValidationContext = { errors: [], partial: _v27.partial };
        validate_sizingBehavior(_v18["height"], _v30, path + "/height");
        if (_v30.errors.length === 0) _v28 = true;
      }
      if (!_v28) {
        _v27.errors.push({ path: path + "/height", message: "expected one of: number, \"$variable\", sizing behavior (fit_content or fill_container, with optional fallback size like fit_content(100))" + ", got " + JSON.stringify(_v18["height"]) });
      }
      if (_v27.errors.length > 0 && ctx.transform) {
        const _v31 = ctx.transform("sizingBehavior", _v18["height"]);
        if (_v31 !== undefined) _v18["height"] = _v31;
        let _v32 = false;
        if (!_v32) {
          const _v33: ValidationContext = { errors: [], partial: ctx.partial };
          validate_numberOrVariable(_v18["height"], _v33, path + "/height");
          if (_v33.errors.length === 0) _v32 = true;
        }
        if (!_v32) {
          const _v34: ValidationContext = { errors: [], partial: ctx.partial };
          validate_sizingBehavior(_v18["height"], _v34, path + "/height");
          if (_v34.errors.length === 0) _v32 = true;
        }
        if (!_v32) {
          ctx.errors.push({ path: path + "/height", message: "expected one of: number, \"$variable\", sizing behavior (fit_content or fill_container, with optional fallback size like fit_content(100))" + ", got " + JSON.stringify(_v18["height"]) });
        }
      } else {
        for (const _e of _v27.errors) ctx.errors.push(_e);
      }
    }
  }
}

export function validate_blendMode(v: unknown, ctx: ValidationContext, path: string): void {
  if (v !== "normal" && v !== "darken" && v !== "multiply" && v !== "linearBurn" && v !== "colorBurn" && v !== "light" && v !== "screen" && v !== "linearDodge" && v !== "colorDodge" && v !== "overlay" && v !== "softLight" && v !== "hardLight" && v !== "difference" && v !== "exclusion" && v !== "hue" && v !== "saturation" && v !== "color" && v !== "luminosity") {
    ctx.errors.push({ path: path, message: "expected one of: \"normal\", \"darken\", \"multiply\", \"linearBurn\", \"colorBurn\", \"light\", \"screen\", \"linearDodge\", \"colorDodge\", \"overlay\", \"softLight\", \"hardLight\", \"difference\", \"exclusion\", \"hue\", \"saturation\", \"color\", \"luminosity\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_effect(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected one of: \"blur\", \"background_blur\", \"shadow\"" + ", got " + JSON.stringify(v) });
  } else {
    const _v35 = v as Record<string, unknown>;
    switch (_v35["type"]) {
      case "blur":
        if (typeof v !== "object" || v === null) {
          ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
        } else {
          const _v36 = v as Record<string, unknown>;
          if (_v36["enabled"] !== undefined) {
            validate_booleanOrVariable(_v36["enabled"], ctx, path + "/enabled");
          }
          if (!ctx.partial && !("type" in _v36)) {
            ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
          } else if (_v36["type"] !== undefined) {
            if (_v36["type"] !== "blur") {
              ctx.errors.push({ path: path + "/type", message: "expected " + "\"blur\"" + ", got " + JSON.stringify(_v36["type"]) });
            }
          }
          if (_v36["radius"] !== undefined) {
            validate_numberOrVariable(_v36["radius"], ctx, path + "/radius");
          }
          for (const _v37 of Object.keys(_v36)) {
            if (_v37 !== "enabled" && _v37 !== "type" && _v37 !== "radius") {
              ctx.errors.push({ path: path + "/" + _v37, message: "unexpected property" + ", got " + JSON.stringify(_v37) });
            }
          }
        }
        break;
      case "background_blur":
        if (typeof v !== "object" || v === null) {
          ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
        } else {
          const _v38 = v as Record<string, unknown>;
          if (_v38["enabled"] !== undefined) {
            validate_booleanOrVariable(_v38["enabled"], ctx, path + "/enabled");
          }
          if (!ctx.partial && !("type" in _v38)) {
            ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
          } else if (_v38["type"] !== undefined) {
            if (_v38["type"] !== "background_blur") {
              ctx.errors.push({ path: path + "/type", message: "expected " + "\"background_blur\"" + ", got " + JSON.stringify(_v38["type"]) });
            }
          }
          if (_v38["radius"] !== undefined) {
            validate_numberOrVariable(_v38["radius"], ctx, path + "/radius");
          }
          for (const _v39 of Object.keys(_v38)) {
            if (_v39 !== "enabled" && _v39 !== "type" && _v39 !== "radius") {
              ctx.errors.push({ path: path + "/" + _v39, message: "unexpected property" + ", got " + JSON.stringify(_v39) });
            }
          }
        }
        break;
      case "shadow":
        if (typeof v !== "object" || v === null) {
          ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
        } else {
          const _v40 = v as Record<string, unknown>;
          if (!ctx.partial && !("type" in _v40)) {
            ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
          } else if (_v40["type"] !== undefined) {
            if (_v40["type"] !== "shadow") {
              ctx.errors.push({ path: path + "/type", message: "expected " + "\"shadow\"" + ", got " + JSON.stringify(_v40["type"]) });
            }
          }
          if (_v40["enabled"] !== undefined) {
            validate_booleanOrVariable(_v40["enabled"], ctx, path + "/enabled");
          }
          if (_v40["shadowType"] !== undefined) {
            if (_v40["shadowType"] !== "inner" && _v40["shadowType"] !== "outer") {
              ctx.errors.push({ path: path + "/shadowType", message: "expected one of: \"inner\", \"outer\"" + ", got " + JSON.stringify(_v40["shadowType"]) });
            }
          }
          if (_v40["offset"] !== undefined) {
            if (typeof _v40["offset"] !== "object" || _v40["offset"] === null) {
              ctx.errors.push({ path: path + "/offset", message: "expected object" + ", got " + JSON.stringify(_v40["offset"]) });
            } else {
              const _v41 = _v40["offset"] as Record<string, unknown>;
              if (!ctx.partial && !("x" in _v41)) {
                ctx.errors.push({ path: path + "/offset" + "/x", message: "missing required property" + ", got " + JSON.stringify(_v40["offset"]) });
              } else if (_v41["x"] !== undefined) {
                validate_numberOrVariable(_v41["x"], ctx, path + "/offset" + "/x");
              }
              if (!ctx.partial && !("y" in _v41)) {
                ctx.errors.push({ path: path + "/offset" + "/y", message: "missing required property" + ", got " + JSON.stringify(_v40["offset"]) });
              } else if (_v41["y"] !== undefined) {
                validate_numberOrVariable(_v41["y"], ctx, path + "/offset" + "/y");
              }
              for (const _v42 of Object.keys(_v41)) {
                if (_v42 !== "x" && _v42 !== "y") {
                  ctx.errors.push({ path: path + "/offset" + "/" + _v42, message: "unexpected property" + ", got " + JSON.stringify(_v42) });
                }
              }
            }
          }
          if (_v40["spread"] !== undefined) {
            validate_numberOrVariable(_v40["spread"], ctx, path + "/spread");
          }
          if (_v40["blur"] !== undefined) {
            validate_numberOrVariable(_v40["blur"], ctx, path + "/blur");
          }
          if (_v40["color"] !== undefined) {
            const _v43: ValidationContext = { errors: [], partial: ctx.partial };
            validate_colorOrVariable(_v40["color"], _v43, path + "/color");
            if (_v43.errors.length > 0 && ctx.transform) {
              const _v44 = ctx.transform("color", _v40["color"]);
              if (_v44 !== undefined) _v40["color"] = _v44;
              validate_colorOrVariable(_v40["color"], ctx, path + "/color");
            } else {
              for (const _e of _v43.errors) ctx.errors.push(_e);
            }
          }
          if (_v40["blendMode"] !== undefined) {
            validate_blendMode(_v40["blendMode"], ctx, path + "/blendMode");
          }
          for (const _v45 of Object.keys(_v40)) {
            if (_v45 !== "type" && _v45 !== "enabled" && _v45 !== "shadowType" && _v45 !== "offset" && _v45 !== "spread" && _v45 !== "blur" && _v45 !== "color" && _v45 !== "blendMode") {
              ctx.errors.push({ path: path + "/" + _v45, message: "unexpected property" + ", got " + JSON.stringify(_v45) });
            }
          }
        }
        break;
      default:
        ctx.errors.push({ path: path + "/type", message: "expected one of: \"blur\", \"background_blur\", \"shadow\"" + ", got " + JSON.stringify(_v35["type"]) });
    }
  }
}

export function validate_effects(v: unknown, ctx: ValidationContext, path: string): void {
  if (Array.isArray(v)) {
    for (let _v46 = 0; _v46 < v.length; _v46++) {
      validate_effect(v[_v46], ctx, path + "/" + _v46);
    }
  } else {
    validate_effect(v, ctx, path);
  }
}

export function validate_canHaveEffects(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v47 = v as Record<string, unknown>;
    if (_v47["effect"] !== undefined) {
      validate_effects(_v47["effect"], ctx, path + "/effect");
    }
  }
}

export function validate_fill(v: unknown, ctx: ValidationContext, path: string): void {
  let _v48 = false;
  if (!_v48) {
    const _v49: ValidationContext = { errors: [], partial: ctx.partial };
    validate_colorOrVariable(v, _v49, path);
    if (_v49.errors.length === 0) _v48 = true;
  }
  if (!_v48) {
    if (typeof v !== "object" || v === null) {
      ctx.errors.push({ path: path, message: "expected one of: color hex string (#RRGGBBAA, #RRGGBB or #RGB), \"$variable\", {type: \"color\"}, {type: \"gradient\"}, {type: \"image\"}, {type: \"mesh_gradient\"}" + ", got " + JSON.stringify(v) });
    } else {
      const _v50 = v as Record<string, unknown>;
      switch (_v50["type"]) {
        case "color":
          if (typeof v !== "object" || v === null) {
            ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
          } else {
            const _v51 = v as Record<string, unknown>;
            if (!ctx.partial && !("type" in _v51)) {
              ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
            } else if (_v51["type"] !== undefined) {
              if (_v51["type"] !== "color") {
                ctx.errors.push({ path: path + "/type", message: "expected " + "\"color\"" + ", got " + JSON.stringify(_v51["type"]) });
              }
            }
            if (_v51["enabled"] !== undefined) {
              validate_booleanOrVariable(_v51["enabled"], ctx, path + "/enabled");
            }
            if (_v51["blendMode"] !== undefined) {
              validate_blendMode(_v51["blendMode"], ctx, path + "/blendMode");
            }
            if (!ctx.partial && !("color" in _v51)) {
              ctx.errors.push({ path: path + "/color", message: "missing required property" + ", got " + JSON.stringify(v) });
            } else if (_v51["color"] !== undefined) {
              const _v52: ValidationContext = { errors: [], partial: ctx.partial };
              validate_colorOrVariable(_v51["color"], _v52, path + "/color");
              if (_v52.errors.length > 0 && ctx.transform) {
                const _v53 = ctx.transform("color", _v51["color"]);
                if (_v53 !== undefined) _v51["color"] = _v53;
                validate_colorOrVariable(_v51["color"], ctx, path + "/color");
              } else {
                for (const _e of _v52.errors) ctx.errors.push(_e);
              }
            }
            for (const _v54 of Object.keys(_v51)) {
              if (_v54 !== "type" && _v54 !== "enabled" && _v54 !== "blendMode" && _v54 !== "color") {
                ctx.errors.push({ path: path + "/" + _v54, message: "unexpected property" + ", got " + JSON.stringify(_v54) });
              }
            }
          }
          break;
        case "gradient":
          if (typeof v !== "object" || v === null) {
            ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
          } else {
            const _v55 = v as Record<string, unknown>;
            if (!ctx.partial && !("type" in _v55)) {
              ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
            } else if (_v55["type"] !== undefined) {
              if (_v55["type"] !== "gradient") {
                ctx.errors.push({ path: path + "/type", message: "expected " + "\"gradient\"" + ", got " + JSON.stringify(_v55["type"]) });
              }
            }
            if (_v55["enabled"] !== undefined) {
              validate_booleanOrVariable(_v55["enabled"], ctx, path + "/enabled");
            }
            if (_v55["blendMode"] !== undefined) {
              validate_blendMode(_v55["blendMode"], ctx, path + "/blendMode");
            }
            if (_v55["gradientType"] !== undefined) {
              if (_v55["gradientType"] !== "linear" && _v55["gradientType"] !== "radial" && _v55["gradientType"] !== "angular") {
                ctx.errors.push({ path: path + "/gradientType", message: "expected one of: \"linear\", \"radial\", \"angular\"" + ", got " + JSON.stringify(_v55["gradientType"]) });
              }
            }
            if (_v55["opacity"] !== undefined) {
              validate_numberOrVariable(_v55["opacity"], ctx, path + "/opacity");
            }
            if (_v55["center"] !== undefined) {
              validate_position(_v55["center"], ctx, path + "/center");
            }
            if (_v55["size"] !== undefined) {
              if (typeof _v55["size"] !== "object" || _v55["size"] === null) {
                ctx.errors.push({ path: path + "/size", message: "expected object" + ", got " + JSON.stringify(_v55["size"]) });
              } else {
                const _v56 = _v55["size"] as Record<string, unknown>;
                if (_v56["width"] !== undefined) {
                  validate_numberOrVariable(_v56["width"], ctx, path + "/size" + "/width");
                }
                if (_v56["height"] !== undefined) {
                  validate_numberOrVariable(_v56["height"], ctx, path + "/size" + "/height");
                }
                for (const _v57 of Object.keys(_v56)) {
                  if (_v57 !== "width" && _v57 !== "height") {
                    ctx.errors.push({ path: path + "/size" + "/" + _v57, message: "unexpected property" + ", got " + JSON.stringify(_v57) });
                  }
                }
              }
            }
            if (_v55["rotation"] !== undefined) {
              validate_numberOrVariable(_v55["rotation"], ctx, path + "/rotation");
            }
            if (_v55["colors"] !== undefined) {
              if (!Array.isArray(_v55["colors"])) {
                ctx.errors.push({ path: path + "/colors", message: "expected array" + ", got " + JSON.stringify(_v55["colors"]) });
              } else {
                if (_v55["colors"].length < 1) {
                  ctx.errors.push({ path: path + "/colors", message: "expected at least 1 items" + ", got " + JSON.stringify(_v55["colors"].length) });
                }
                for (let _v58 = 0; _v58 < _v55["colors"].length; _v58++) {
                  if (typeof _v55["colors"][_v58] !== "object" || _v55["colors"][_v58] === null) {
                    ctx.errors.push({ path: path + "/colors" + "/" + _v58, message: "expected object" + ", got " + JSON.stringify(_v55["colors"][_v58]) });
                  } else {
                    const _v59 = _v55["colors"][_v58] as Record<string, unknown>;
                    if (!ctx.partial && !("color" in _v59)) {
                      ctx.errors.push({ path: path + "/colors" + "/" + _v58 + "/color", message: "missing required property" + ", got " + JSON.stringify(_v55["colors"][_v58]) });
                    } else if (_v59["color"] !== undefined) {
                      const _v60: ValidationContext = { errors: [], partial: ctx.partial };
                      validate_colorOrVariable(_v59["color"], _v60, path + "/colors" + "/" + _v58 + "/color");
                      if (_v60.errors.length > 0 && ctx.transform) {
                        const _v61 = ctx.transform("color", _v59["color"]);
                        if (_v61 !== undefined) _v59["color"] = _v61;
                        validate_colorOrVariable(_v59["color"], ctx, path + "/colors" + "/" + _v58 + "/color");
                      } else {
                        for (const _e of _v60.errors) ctx.errors.push(_e);
                      }
                    }
                    if (!ctx.partial && !("position" in _v59)) {
                      ctx.errors.push({ path: path + "/colors" + "/" + _v58 + "/position", message: "missing required property" + ", got " + JSON.stringify(_v55["colors"][_v58]) });
                    } else if (_v59["position"] !== undefined) {
                      validate_numberOrVariable(_v59["position"], ctx, path + "/colors" + "/" + _v58 + "/position");
                    }
                    for (const _v62 of Object.keys(_v59)) {
                      if (_v62 !== "color" && _v62 !== "position") {
                        ctx.errors.push({ path: path + "/colors" + "/" + _v58 + "/" + _v62, message: "unexpected property" + ", got " + JSON.stringify(_v62) });
                      }
                    }
                  }
                }
              }
            }
            for (const _v63 of Object.keys(_v55)) {
              if (_v63 !== "type" && _v63 !== "enabled" && _v63 !== "blendMode" && _v63 !== "gradientType" && _v63 !== "opacity" && _v63 !== "center" && _v63 !== "size" && _v63 !== "rotation" && _v63 !== "colors") {
                ctx.errors.push({ path: path + "/" + _v63, message: "unexpected property" + ", got " + JSON.stringify(_v63) });
              }
            }
          }
          break;
        case "image":
          if (typeof v !== "object" || v === null) {
            ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
          } else {
            const _v64 = v as Record<string, unknown>;
            if (!ctx.partial && !("type" in _v64)) {
              ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
            } else if (_v64["type"] !== undefined) {
              if (_v64["type"] !== "image") {
                ctx.errors.push({ path: path + "/type", message: "expected " + "\"image\"" + ", got " + JSON.stringify(_v64["type"]) });
              }
            }
            if (_v64["enabled"] !== undefined) {
              validate_booleanOrVariable(_v64["enabled"], ctx, path + "/enabled");
            }
            if (_v64["blendMode"] !== undefined) {
              validate_blendMode(_v64["blendMode"], ctx, path + "/blendMode");
            }
            if (_v64["opacity"] !== undefined) {
              validate_numberOrVariable(_v64["opacity"], ctx, path + "/opacity");
            }
            if (!ctx.partial && !("url" in _v64)) {
              ctx.errors.push({ path: path + "/url", message: "missing required property" + ", got " + JSON.stringify(v) });
            } else if (_v64["url"] !== undefined) {
              if (typeof _v64["url"] !== "string") {
                ctx.errors.push({ path: path + "/url", message: "expected string" + ", got " + JSON.stringify(_v64["url"]) });
              }
            }
            if (_v64["mode"] !== undefined) {
              if (_v64["mode"] !== "stretch" && _v64["mode"] !== "fill" && _v64["mode"] !== "fit") {
                ctx.errors.push({ path: path + "/mode", message: "expected one of: \"stretch\", \"fill\", \"fit\"" + ", got " + JSON.stringify(_v64["mode"]) });
              }
            }
            for (const _v65 of Object.keys(_v64)) {
              if (_v65 !== "type" && _v65 !== "enabled" && _v65 !== "blendMode" && _v65 !== "opacity" && _v65 !== "url" && _v65 !== "mode") {
                ctx.errors.push({ path: path + "/" + _v65, message: "unexpected property" + ", got " + JSON.stringify(_v65) });
              }
            }
          }
          break;
        case "mesh_gradient":
          if (typeof v !== "object" || v === null) {
            ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
          } else {
            const _v66 = v as Record<string, unknown>;
            if (!ctx.partial && !("type" in _v66)) {
              ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
            } else if (_v66["type"] !== undefined) {
              if (_v66["type"] !== "mesh_gradient") {
                ctx.errors.push({ path: path + "/type", message: "expected " + "\"mesh_gradient\"" + ", got " + JSON.stringify(_v66["type"]) });
              }
            }
            if (_v66["enabled"] !== undefined) {
              validate_booleanOrVariable(_v66["enabled"], ctx, path + "/enabled");
            }
            if (_v66["blendMode"] !== undefined) {
              validate_blendMode(_v66["blendMode"], ctx, path + "/blendMode");
            }
            if (_v66["opacity"] !== undefined) {
              validate_numberOrVariable(_v66["opacity"], ctx, path + "/opacity");
            }
            if (_v66["columns"] !== undefined) {
              if (typeof _v66["columns"] !== "number") {
                ctx.errors.push({ path: path + "/columns", message: "expected number" + ", got " + JSON.stringify(_v66["columns"]) });
              }
            }
            if (_v66["rows"] !== undefined) {
              if (typeof _v66["rows"] !== "number") {
                ctx.errors.push({ path: path + "/rows", message: "expected number" + ", got " + JSON.stringify(_v66["rows"]) });
              }
            }
            if (_v66["colors"] !== undefined) {
              if (!Array.isArray(_v66["colors"])) {
                ctx.errors.push({ path: path + "/colors", message: "expected array" + ", got " + JSON.stringify(_v66["colors"]) });
              } else {
                for (let _v67 = 0; _v67 < _v66["colors"].length; _v67++) {
                  const _v68: ValidationContext = { errors: [], partial: ctx.partial };
                  validate_colorOrVariable(_v66["colors"][_v67], _v68, path + "/colors" + "/" + _v67);
                  if (_v68.errors.length > 0 && ctx.transform) {
                    const _v69 = ctx.transform("color", _v66["colors"][_v67]);
                    if (_v69 !== undefined) _v66["colors"][_v67] = _v69;
                    validate_colorOrVariable(_v66["colors"][_v67], ctx, path + "/colors" + "/" + _v67);
                  } else {
                    for (const _e of _v68.errors) ctx.errors.push(_e);
                  }
                }
              }
            }
            if (_v66["points"] !== undefined) {
              if (!Array.isArray(_v66["points"])) {
                ctx.errors.push({ path: path + "/points", message: "expected array" + ", got " + JSON.stringify(_v66["points"]) });
              } else {
                for (let _v70 = 0; _v70 < _v66["points"].length; _v70++) {
                  if (Array.isArray(_v66["points"][_v70])) {
                    if (_v66["points"][_v70].length !== 2) {
                      ctx.errors.push({ path: path + "/points" + "/" + _v70, message: "expected either number[2] or object" + ", got " + JSON.stringify(_v66["points"][_v70]) });
                    } else {
                      for (let _v71 = 0; _v71 < _v66["points"][_v70].length; _v71++) {
                        if (typeof _v66["points"][_v70][_v71] !== "number") {
                          ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/" + _v71, message: "expected number" + ", got " + JSON.stringify(_v66["points"][_v70][_v71]) });
                        }
                      }
                    }
                  } else if (typeof _v66["points"][_v70] === "object" && _v66["points"][_v70] !== null) {
                    const _v72 = _v66["points"][_v70] as Record<string, unknown>;
                    if (!ctx.partial && !("position" in _v72)) {
                      ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/position", message: "missing required property" + ", got " + JSON.stringify(_v66["points"][_v70]) });
                    } else if (_v72["position"] !== undefined) {
                      if (!Array.isArray(_v72["position"])) {
                        ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/position", message: "expected number[2]" + ", got " + JSON.stringify(_v72["position"]) });
                      } else {
                        if (_v72["position"].length !== 2) {
                          ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/position", message: "expected number[2]" + ", got " + JSON.stringify(_v72["position"]) });
                        } else {
                          for (let _v73 = 0; _v73 < _v72["position"].length; _v73++) {
                            if (typeof _v72["position"][_v73] !== "number") {
                              ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/position" + "/" + _v73, message: "expected number" + ", got " + JSON.stringify(_v72["position"][_v73]) });
                            }
                          }
                        }
                      }
                    }
                    if (_v72["leftHandle"] !== undefined) {
                      if (!Array.isArray(_v72["leftHandle"])) {
                        ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/leftHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["leftHandle"]) });
                      } else {
                        if (_v72["leftHandle"].length !== 2) {
                          ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/leftHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["leftHandle"]) });
                        } else {
                          for (let _v74 = 0; _v74 < _v72["leftHandle"].length; _v74++) {
                            if (typeof _v72["leftHandle"][_v74] !== "number") {
                              ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/leftHandle" + "/" + _v74, message: "expected number" + ", got " + JSON.stringify(_v72["leftHandle"][_v74]) });
                            }
                          }
                        }
                      }
                    }
                    if (_v72["rightHandle"] !== undefined) {
                      if (!Array.isArray(_v72["rightHandle"])) {
                        ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/rightHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["rightHandle"]) });
                      } else {
                        if (_v72["rightHandle"].length !== 2) {
                          ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/rightHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["rightHandle"]) });
                        } else {
                          for (let _v75 = 0; _v75 < _v72["rightHandle"].length; _v75++) {
                            if (typeof _v72["rightHandle"][_v75] !== "number") {
                              ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/rightHandle" + "/" + _v75, message: "expected number" + ", got " + JSON.stringify(_v72["rightHandle"][_v75]) });
                            }
                          }
                        }
                      }
                    }
                    if (_v72["topHandle"] !== undefined) {
                      if (!Array.isArray(_v72["topHandle"])) {
                        ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/topHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["topHandle"]) });
                      } else {
                        if (_v72["topHandle"].length !== 2) {
                          ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/topHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["topHandle"]) });
                        } else {
                          for (let _v76 = 0; _v76 < _v72["topHandle"].length; _v76++) {
                            if (typeof _v72["topHandle"][_v76] !== "number") {
                              ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/topHandle" + "/" + _v76, message: "expected number" + ", got " + JSON.stringify(_v72["topHandle"][_v76]) });
                            }
                          }
                        }
                      }
                    }
                    if (_v72["bottomHandle"] !== undefined) {
                      if (!Array.isArray(_v72["bottomHandle"])) {
                        ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/bottomHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["bottomHandle"]) });
                      } else {
                        if (_v72["bottomHandle"].length !== 2) {
                          ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/bottomHandle", message: "expected number[2]" + ", got " + JSON.stringify(_v72["bottomHandle"]) });
                        } else {
                          for (let _v77 = 0; _v77 < _v72["bottomHandle"].length; _v77++) {
                            if (typeof _v72["bottomHandle"][_v77] !== "number") {
                              ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/bottomHandle" + "/" + _v77, message: "expected number" + ", got " + JSON.stringify(_v72["bottomHandle"][_v77]) });
                            }
                          }
                        }
                      }
                    }
                    for (const _v78 of Object.keys(_v72)) {
                      if (_v78 !== "position" && _v78 !== "leftHandle" && _v78 !== "rightHandle" && _v78 !== "topHandle" && _v78 !== "bottomHandle") {
                        ctx.errors.push({ path: path + "/points" + "/" + _v70 + "/" + _v78, message: "unexpected property" + ", got " + JSON.stringify(_v78) });
                      }
                    }
                  } else {
                    ctx.errors.push({ path: path + "/points" + "/" + _v70, message: "expected either number[2] or object" + ", got " + JSON.stringify(_v66["points"][_v70]) });
                  }
                }
              }
            }
            for (const _v79 of Object.keys(_v66)) {
              if (_v79 !== "type" && _v79 !== "enabled" && _v79 !== "blendMode" && _v79 !== "opacity" && _v79 !== "columns" && _v79 !== "rows" && _v79 !== "colors" && _v79 !== "points") {
                ctx.errors.push({ path: path + "/" + _v79, message: "unexpected property" + ", got " + JSON.stringify(_v79) });
              }
            }
          }
          break;
        default:
          ctx.errors.push({ path: path + "/type", message: "expected one of: \"color\", \"gradient\", \"image\", \"mesh_gradient\"" + ", got " + JSON.stringify(_v50["type"]) });
      }
    }
  }
}

export function validate_fills(v: unknown, ctx: ValidationContext, path: string): void {
  if (Array.isArray(v)) {
    for (let _v80 = 0; _v80 < v.length; _v80++) {
      const _v81: ValidationContext = { errors: [], partial: ctx.partial };
      validate_fill(v[_v80], _v81, path + "/" + _v80);
      if (_v81.errors.length > 0 && ctx.transform) {
        const _v82 = ctx.transform("color", v[_v80]);
        if (_v82 !== undefined) v[_v80] = _v82;
        validate_fill(v[_v80], ctx, path + "/" + _v80);
      } else {
        for (const _e of _v81.errors) ctx.errors.push(_e);
      }
    }
  } else {
    validate_fill(v, ctx, path);
  }
}

export function validate_stroke(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v83 = v as Record<string, unknown>;
    if (_v83["align"] !== undefined) {
      if (_v83["align"] !== "inside" && _v83["align"] !== "center" && _v83["align"] !== "outside") {
        ctx.errors.push({ path: path + "/align", message: "expected one of: \"inside\", \"center\", \"outside\"" + ", got " + JSON.stringify(_v83["align"]) });
      }
    }
    if (_v83["thickness"] !== undefined) {
      let _v84 = false;
      if (!_v84) {
        const _v85: ValidationContext = { errors: [], partial: ctx.partial };
        validate_numberOrVariable(_v83["thickness"], _v85, path + "/thickness");
        if (_v85.errors.length === 0) _v84 = true;
      }
      if (!_v84) {
        const _v86: ValidationContext = { errors: [], partial: ctx.partial };
        if (typeof _v83["thickness"] !== "object" || _v83["thickness"] === null) {
          _v86.errors.push({ path: path + "/thickness", message: "expected object" + ", got " + JSON.stringify(_v83["thickness"]) });
        } else {
          const _v87 = _v83["thickness"] as Record<string, unknown>;
          if (_v87["top"] !== undefined) {
            validate_numberOrVariable(_v87["top"], _v86, path + "/thickness" + "/top");
          }
          if (_v87["right"] !== undefined) {
            validate_numberOrVariable(_v87["right"], _v86, path + "/thickness" + "/right");
          }
          if (_v87["bottom"] !== undefined) {
            validate_numberOrVariable(_v87["bottom"], _v86, path + "/thickness" + "/bottom");
          }
          if (_v87["left"] !== undefined) {
            validate_numberOrVariable(_v87["left"], _v86, path + "/thickness" + "/left");
          }
          for (const _v88 of Object.keys(_v87)) {
            if (_v88 !== "top" && _v88 !== "right" && _v88 !== "bottom" && _v88 !== "left") {
              _v86.errors.push({ path: path + "/thickness" + "/" + _v88, message: "unexpected property" + ", got " + JSON.stringify(_v88) });
            }
          }
        }
        if (_v86.errors.length === 0) _v84 = true;
      }
      if (!_v84) {
        ctx.errors.push({ path: path + "/thickness", message: "expected one of: number, \"$variable\", object" + ", got " + JSON.stringify(_v83["thickness"]) });
      }
    }
    if (_v83["join"] !== undefined) {
      if (_v83["join"] !== "miter" && _v83["join"] !== "bevel" && _v83["join"] !== "round") {
        ctx.errors.push({ path: path + "/join", message: "expected one of: \"miter\", \"bevel\", \"round\"" + ", got " + JSON.stringify(_v83["join"]) });
      }
    }
    if (_v83["miterAngle"] !== undefined) {
      validate_numberOrVariable(_v83["miterAngle"], ctx, path + "/miterAngle");
    }
    if (_v83["cap"] !== undefined) {
      if (_v83["cap"] !== "none" && _v83["cap"] !== "round" && _v83["cap"] !== "square") {
        ctx.errors.push({ path: path + "/cap", message: "expected one of: \"none\", \"round\", \"square\"" + ", got " + JSON.stringify(_v83["cap"]) });
      }
    }
    if (_v83["dashPattern"] !== undefined) {
      if (!Array.isArray(_v83["dashPattern"])) {
        ctx.errors.push({ path: path + "/dashPattern", message: "expected array" + ", got " + JSON.stringify(_v83["dashPattern"]) });
      } else {
        for (let _v89 = 0; _v89 < _v83["dashPattern"].length; _v89++) {
          if (typeof _v83["dashPattern"][_v89] !== "number") {
            ctx.errors.push({ path: path + "/dashPattern" + "/" + _v89, message: "expected number" + ", got " + JSON.stringify(_v83["dashPattern"][_v89]) });
          }
        }
      }
    }
    if (_v83["fill"] !== undefined) {
      const _v90: ValidationContext = { errors: [], partial: ctx.partial };
      validate_fills(_v83["fill"], _v90, path + "/fill");
      if (_v90.errors.length > 0 && ctx.transform) {
        const _v91 = ctx.transform("color", _v83["fill"]);
        if (_v91 !== undefined) _v83["fill"] = _v91;
        validate_fills(_v83["fill"], ctx, path + "/fill");
      } else {
        for (const _e of _v90.errors) ctx.errors.push(_e);
      }
    }
    for (const _v92 of Object.keys(_v83)) {
      if (_v92 !== "align" && _v92 !== "thickness" && _v92 !== "join" && _v92 !== "miterAngle" && _v92 !== "cap" && _v92 !== "dashPattern" && _v92 !== "fill") {
        ctx.errors.push({ path: path + "/" + _v92, message: "unexpected property" + ", got " + JSON.stringify(_v92) });
      }
    }
  }
}

export function validate_canHaveGraphics(v: unknown, ctx: ValidationContext, path: string): void {
  validate_canHaveEffects(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v93 = v as Record<string, unknown>;
    if (_v93["stroke"] !== undefined) {
      validate_stroke(_v93["stroke"], ctx, path + "/stroke");
    }
    if (_v93["fill"] !== undefined) {
      const _v94: ValidationContext = { errors: [], partial: ctx.partial };
      validate_fills(_v93["fill"], _v94, path + "/fill");
      if (_v94.errors.length > 0 && ctx.transform) {
        const _v95 = ctx.transform("color", _v93["fill"]);
        if (_v95 !== undefined) _v93["fill"] = _v95;
        validate_fills(_v93["fill"], ctx, path + "/fill");
      } else {
        for (const _e of _v94.errors) ctx.errors.push(_e);
      }
    }
  }
}

export function validate_rectangleish(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveGraphics(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v96 = v as Record<string, unknown>;
    if (_v96["cornerRadius"] !== undefined) {
      if (Array.isArray(_v96["cornerRadius"])) {
        if (_v96["cornerRadius"].length !== 4) {
          ctx.errors.push({ path: path + "/cornerRadius", message: "expected one of: number, \"$variable\", (number | \"$variable\")[4]" + ", got " + JSON.stringify(_v96["cornerRadius"]) });
        } else {
          for (let _v97 = 0; _v97 < _v96["cornerRadius"].length; _v97++) {
            validate_numberOrVariable(_v96["cornerRadius"][_v97], ctx, path + "/cornerRadius" + "/" + _v97);
          }
        }
      } else {
        const _v98: ValidationContext = { errors: [], partial: ctx.partial };
        let _v99 = false;
        if (!_v99) {
          const _v100: ValidationContext = { errors: [], partial: _v98.partial };
          validate_numberOrVariable(_v96["cornerRadius"], _v100, path + "/cornerRadius");
          if (_v100.errors.length === 0) _v99 = true;
        }
        if (!_v99) {
          _v98.errors.push({ path: path + "/cornerRadius", message: "expected either number or \"$variable\"" + ", got " + JSON.stringify(_v96["cornerRadius"]) });
        }
        if (_v98.errors.length > 0) {
          ctx.errors.push({ path: path + "/cornerRadius", message: "expected one of: number, \"$variable\", (number | \"$variable\")[4]" + ", got " + JSON.stringify(_v96["cornerRadius"]) });
        }
      }
    }
  }
}

export function validate_layout(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v101 = v as Record<string, unknown>;
    if (_v101["layout"] !== undefined) {
      if (_v101["layout"] !== "none" && _v101["layout"] !== "vertical" && _v101["layout"] !== "horizontal") {
        ctx.errors.push({ path: path + "/layout", message: "expected one of: \"none\", \"vertical\", \"horizontal\"" + ", got " + JSON.stringify(_v101["layout"]) });
      }
    }
    if (_v101["gap"] !== undefined) {
      validate_numberOrVariable(_v101["gap"], ctx, path + "/gap");
    }
    if (_v101["layoutIncludeStroke"] !== undefined) {
      if (typeof _v101["layoutIncludeStroke"] !== "boolean") {
        ctx.errors.push({ path: path + "/layoutIncludeStroke", message: "expected boolean" + ", got " + JSON.stringify(_v101["layoutIncludeStroke"]) });
      }
    }
    if (_v101["padding"] !== undefined) {
      if (Array.isArray(_v101["padding"])) {
        let _v102 = false;
        if (!_v102) {
          const _v103: ValidationContext = { errors: [], partial: ctx.partial };
          if (_v101["padding"].length !== 2) {
            _v103.errors.push({ path: path + "/padding", message: "expected (number | \"$variable\")[2]" + ", got " + JSON.stringify(_v101["padding"]) });
          } else {
            for (let _v104 = 0; _v104 < _v101["padding"].length; _v104++) {
              validate_numberOrVariable(_v101["padding"][_v104], _v103, path + "/padding" + "/" + _v104);
            }
          }
          if (_v103.errors.length === 0) _v102 = true;
        }
        if (!_v102) {
          const _v105: ValidationContext = { errors: [], partial: ctx.partial };
          if (_v101["padding"].length !== 4) {
            _v105.errors.push({ path: path + "/padding", message: "expected (number | \"$variable\")[4]" + ", got " + JSON.stringify(_v101["padding"]) });
          } else {
            for (let _v106 = 0; _v106 < _v101["padding"].length; _v106++) {
              validate_numberOrVariable(_v101["padding"][_v106], _v105, path + "/padding" + "/" + _v106);
            }
          }
          if (_v105.errors.length === 0) _v102 = true;
        }
        if (!_v102) {
          ctx.errors.push({ path: path + "/padding", message: "expected number, [horizontal, vertical], or [top, right, bottom, left], each value can be a number or variable" + ", got " + JSON.stringify(_v101["padding"]) });
        }
      } else {
        const _v107: ValidationContext = { errors: [], partial: ctx.partial };
        let _v108 = false;
        if (!_v108) {
          const _v109: ValidationContext = { errors: [], partial: _v107.partial };
          validate_numberOrVariable(_v101["padding"], _v109, path + "/padding");
          if (_v109.errors.length === 0) _v108 = true;
        }
        if (!_v108) {
          _v107.errors.push({ path: path + "/padding", message: "expected number, [horizontal, vertical], or [top, right, bottom, left], each value can be a number or variable" + ", got " + JSON.stringify(_v101["padding"]) });
        }
        if (_v107.errors.length > 0) {
          ctx.errors.push({ path: path + "/padding", message: "expected number, [horizontal, vertical], or [top, right, bottom, left], each value can be a number or variable" + ", got " + JSON.stringify(_v101["padding"]) });
        }
      }
    }
    if (_v101["justifyContent"] !== undefined) {
      const _v110: ValidationContext = { errors: [], partial: ctx.partial };
      if (_v101["justifyContent"] !== "start" && _v101["justifyContent"] !== "center" && _v101["justifyContent"] !== "end" && _v101["justifyContent"] !== "space_between" && _v101["justifyContent"] !== "space_around") {
        _v110.errors.push({ path: path + "/justifyContent", message: "expected one of: \"start\", \"center\", \"end\", \"space_between\", \"space_around\"" + ", got " + JSON.stringify(_v101["justifyContent"]) });
      }
      if (_v110.errors.length > 0 && ctx.transform) {
        const _v111 = ctx.transform("justifyContent", _v101["justifyContent"]);
        if (_v111 !== undefined) _v101["justifyContent"] = _v111;
        if (_v101["justifyContent"] !== "start" && _v101["justifyContent"] !== "center" && _v101["justifyContent"] !== "end" && _v101["justifyContent"] !== "space_between" && _v101["justifyContent"] !== "space_around") {
          ctx.errors.push({ path: path + "/justifyContent", message: "expected one of: \"start\", \"center\", \"end\", \"space_between\", \"space_around\"" + ", got " + JSON.stringify(_v101["justifyContent"]) });
        }
      } else {
        for (const _e of _v110.errors) ctx.errors.push(_e);
      }
    }
    if (_v101["alignItems"] !== undefined) {
      const _v112: ValidationContext = { errors: [], partial: ctx.partial };
      if (_v101["alignItems"] !== "start" && _v101["alignItems"] !== "center" && _v101["alignItems"] !== "end") {
        _v112.errors.push({ path: path + "/alignItems", message: "expected one of: \"start\", \"center\", \"end\"" + ", got " + JSON.stringify(_v101["alignItems"]) });
      }
      if (_v112.errors.length > 0 && ctx.transform) {
        const _v113 = ctx.transform("alignItems", _v101["alignItems"]);
        if (_v113 !== undefined) _v101["alignItems"] = _v113;
        if (_v101["alignItems"] !== "start" && _v101["alignItems"] !== "center" && _v101["alignItems"] !== "end") {
          ctx.errors.push({ path: path + "/alignItems", message: "expected one of: \"start\", \"center\", \"end\"" + ", got " + JSON.stringify(_v101["alignItems"]) });
        }
      } else {
        for (const _e of _v112.errors) ctx.errors.push(_e);
      }
    }
  }
}

export function validate_group(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_canHaveChildren(v, ctx, path);
  validate_canHaveEffects(v, ctx, path);
  validate_layout(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v114 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v114)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v114["type"] !== undefined) {
      if (_v114["type"] !== "group") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"group\"" + ", got " + JSON.stringify(_v114["type"]) });
      }
    }
    if (_v114["width"] !== undefined) {
      const _v115: ValidationContext = { errors: [], partial: ctx.partial };
      validate_sizingBehavior(_v114["width"], _v115, path + "/width");
      if (_v115.errors.length > 0 && ctx.transform) {
        const _v116 = ctx.transform("sizingBehavior", _v114["width"]);
        if (_v116 !== undefined) _v114["width"] = _v116;
        validate_sizingBehavior(_v114["width"], ctx, path + "/width");
      } else {
        for (const _e of _v115.errors) ctx.errors.push(_e);
      }
    }
    if (_v114["height"] !== undefined) {
      const _v117: ValidationContext = { errors: [], partial: ctx.partial };
      validate_sizingBehavior(_v114["height"], _v117, path + "/height");
      if (_v117.errors.length > 0 && ctx.transform) {
        const _v118 = ctx.transform("sizingBehavior", _v114["height"]);
        if (_v118 !== undefined) _v114["height"] = _v118;
        validate_sizingBehavior(_v114["height"], ctx, path + "/height");
      } else {
        for (const _e of _v117.errors) ctx.errors.push(_e);
      }
    }
    for (const _v119 of Object.keys(_v114)) {
      if (_v119 !== "type" && _v119 !== "width" && _v119 !== "height" && _v119 !== "x" && _v119 !== "y" && _v119 !== "rotation" && _v119 !== "id" && _v119 !== "name" && _v119 !== "context" && _v119 !== "reusable" && _v119 !== "theme" && _v119 !== "enabled" && _v119 !== "opacity" && _v119 !== "flipX" && _v119 !== "flipY" && _v119 !== "layoutPosition" && _v119 !== "metadata" && _v119 !== "children" && _v119 !== "effect" && _v119 !== "layout" && _v119 !== "gap" && _v119 !== "layoutIncludeStroke" && _v119 !== "padding" && _v119 !== "justifyContent" && _v119 !== "alignItems") {
        ctx.errors.push({ path: path + "/" + _v119, message: "unexpected property" + ", got " + JSON.stringify(_v119) });
      }
    }
  }
}

export function validate_rectangle(v: unknown, ctx: ValidationContext, path: string): void {
  validate_rectangleish(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v120 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v120)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v120["type"] !== undefined) {
      if (_v120["type"] !== "rectangle") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"rectangle\"" + ", got " + JSON.stringify(_v120["type"]) });
      }
    }
    for (const _v121 of Object.keys(_v120)) {
      if (_v121 !== "type" && _v121 !== "x" && _v121 !== "y" && _v121 !== "rotation" && _v121 !== "id" && _v121 !== "name" && _v121 !== "context" && _v121 !== "reusable" && _v121 !== "theme" && _v121 !== "enabled" && _v121 !== "opacity" && _v121 !== "flipX" && _v121 !== "flipY" && _v121 !== "layoutPosition" && _v121 !== "metadata" && _v121 !== "width" && _v121 !== "height" && _v121 !== "effect" && _v121 !== "stroke" && _v121 !== "fill" && _v121 !== "cornerRadius") {
        ctx.errors.push({ path: path + "/" + _v121, message: "unexpected property" + ", got " + JSON.stringify(_v121) });
      }
    }
  }
}

export function validate_ellipse(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveGraphics(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v122 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v122)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v122["type"] !== undefined) {
      if (_v122["type"] !== "ellipse") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"ellipse\"" + ", got " + JSON.stringify(_v122["type"]) });
      }
    }
    if (_v122["innerRadius"] !== undefined) {
      validate_numberOrVariable(_v122["innerRadius"], ctx, path + "/innerRadius");
    }
    if (_v122["startAngle"] !== undefined) {
      validate_numberOrVariable(_v122["startAngle"], ctx, path + "/startAngle");
    }
    if (_v122["sweepAngle"] !== undefined) {
      validate_numberOrVariable(_v122["sweepAngle"], ctx, path + "/sweepAngle");
    }
    for (const _v123 of Object.keys(_v122)) {
      if (_v123 !== "type" && _v123 !== "innerRadius" && _v123 !== "startAngle" && _v123 !== "sweepAngle" && _v123 !== "x" && _v123 !== "y" && _v123 !== "rotation" && _v123 !== "id" && _v123 !== "name" && _v123 !== "context" && _v123 !== "reusable" && _v123 !== "theme" && _v123 !== "enabled" && _v123 !== "opacity" && _v123 !== "flipX" && _v123 !== "flipY" && _v123 !== "layoutPosition" && _v123 !== "metadata" && _v123 !== "width" && _v123 !== "height" && _v123 !== "effect" && _v123 !== "stroke" && _v123 !== "fill") {
        ctx.errors.push({ path: path + "/" + _v123, message: "unexpected property" + ", got " + JSON.stringify(_v123) });
      }
    }
  }
}

export function validate_line(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveGraphics(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v124 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v124)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v124["type"] !== undefined) {
      if (_v124["type"] !== "line") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"line\"" + ", got " + JSON.stringify(_v124["type"]) });
      }
    }
    for (const _v125 of Object.keys(_v124)) {
      if (_v125 !== "type" && _v125 !== "x" && _v125 !== "y" && _v125 !== "rotation" && _v125 !== "id" && _v125 !== "name" && _v125 !== "context" && _v125 !== "reusable" && _v125 !== "theme" && _v125 !== "enabled" && _v125 !== "opacity" && _v125 !== "flipX" && _v125 !== "flipY" && _v125 !== "layoutPosition" && _v125 !== "metadata" && _v125 !== "width" && _v125 !== "height" && _v125 !== "effect" && _v125 !== "stroke" && _v125 !== "fill") {
        ctx.errors.push({ path: path + "/" + _v125, message: "unexpected property" + ", got " + JSON.stringify(_v125) });
      }
    }
  }
}

export function validate_path(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveGraphics(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v126 = v as Record<string, unknown>;
    if (_v126["fillRule"] !== undefined) {
      if (_v126["fillRule"] !== "nonzero" && _v126["fillRule"] !== "evenodd") {
        ctx.errors.push({ path: path + "/fillRule", message: "expected one of: \"nonzero\", \"evenodd\"" + ", got " + JSON.stringify(_v126["fillRule"]) });
      }
    }
    if (_v126["geometry"] !== undefined) {
      if (typeof _v126["geometry"] !== "string") {
        ctx.errors.push({ path: path + "/geometry", message: "expected string" + ", got " + JSON.stringify(_v126["geometry"]) });
      }
    }
  }
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v127 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v127)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v127["type"] !== undefined) {
      if (_v127["type"] !== "path") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"path\"" + ", got " + JSON.stringify(_v127["type"]) });
      }
    }
    for (const _v128 of Object.keys(_v127)) {
      if (_v128 !== "type" && _v128 !== "x" && _v128 !== "y" && _v128 !== "rotation" && _v128 !== "id" && _v128 !== "name" && _v128 !== "context" && _v128 !== "reusable" && _v128 !== "theme" && _v128 !== "enabled" && _v128 !== "opacity" && _v128 !== "flipX" && _v128 !== "flipY" && _v128 !== "layoutPosition" && _v128 !== "metadata" && _v128 !== "width" && _v128 !== "height" && _v128 !== "effect" && _v128 !== "stroke" && _v128 !== "fill" && _v128 !== "fillRule" && _v128 !== "geometry") {
        ctx.errors.push({ path: path + "/" + _v128, message: "unexpected property" + ", got " + JSON.stringify(_v128) });
      }
    }
  }
}

export function validate_polygon(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveGraphics(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v129 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v129)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v129["type"] !== undefined) {
      if (_v129["type"] !== "polygon") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"polygon\"" + ", got " + JSON.stringify(_v129["type"]) });
      }
    }
    if (_v129["polygonCount"] !== undefined) {
      validate_numberOrVariable(_v129["polygonCount"], ctx, path + "/polygonCount");
    }
    if (_v129["cornerRadius"] !== undefined) {
      validate_numberOrVariable(_v129["cornerRadius"], ctx, path + "/cornerRadius");
    }
    for (const _v130 of Object.keys(_v129)) {
      if (_v130 !== "type" && _v130 !== "polygonCount" && _v130 !== "cornerRadius" && _v130 !== "x" && _v130 !== "y" && _v130 !== "rotation" && _v130 !== "id" && _v130 !== "name" && _v130 !== "context" && _v130 !== "reusable" && _v130 !== "theme" && _v130 !== "enabled" && _v130 !== "opacity" && _v130 !== "flipX" && _v130 !== "flipY" && _v130 !== "layoutPosition" && _v130 !== "metadata" && _v130 !== "width" && _v130 !== "height" && _v130 !== "effect" && _v130 !== "stroke" && _v130 !== "fill") {
        ctx.errors.push({ path: path + "/" + _v130, message: "unexpected property" + ", got " + JSON.stringify(_v130) });
      }
    }
  }
}

export function validate_textStyle(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v131 = v as Record<string, unknown>;
    if (_v131["fontFamily"] !== undefined) {
      validate_stringOrVariable(_v131["fontFamily"], ctx, path + "/fontFamily");
    }
    if (_v131["fontSize"] !== undefined) {
      validate_numberOrVariable(_v131["fontSize"], ctx, path + "/fontSize");
    }
    if (_v131["fontWeight"] !== undefined) {
      const _v132: ValidationContext = { errors: [], partial: ctx.partial };
      validate_stringOrVariable(_v131["fontWeight"], _v132, path + "/fontWeight");
      if (_v132.errors.length > 0 && ctx.transform) {
        const _v133 = ctx.transform("fontWeight", _v131["fontWeight"]);
        if (_v133 !== undefined) _v131["fontWeight"] = _v133;
        validate_stringOrVariable(_v131["fontWeight"], ctx, path + "/fontWeight");
      } else {
        for (const _e of _v132.errors) ctx.errors.push(_e);
      }
    }
    if (_v131["letterSpacing"] !== undefined) {
      validate_numberOrVariable(_v131["letterSpacing"], ctx, path + "/letterSpacing");
    }
    if (_v131["fontStyle"] !== undefined) {
      validate_stringOrVariable(_v131["fontStyle"], ctx, path + "/fontStyle");
    }
    if (_v131["underline"] !== undefined) {
      validate_booleanOrVariable(_v131["underline"], ctx, path + "/underline");
    }
    if (_v131["lineHeight"] !== undefined) {
      validate_numberOrVariable(_v131["lineHeight"], ctx, path + "/lineHeight");
    }
    if (_v131["textAlign"] !== undefined) {
      const _v134: ValidationContext = { errors: [], partial: ctx.partial };
      if (_v131["textAlign"] !== "left" && _v131["textAlign"] !== "center" && _v131["textAlign"] !== "right" && _v131["textAlign"] !== "justify") {
        _v134.errors.push({ path: path + "/textAlign", message: "expected one of: \"left\", \"center\", \"right\", \"justify\"" + ", got " + JSON.stringify(_v131["textAlign"]) });
      }
      if (_v134.errors.length > 0 && ctx.transform) {
        const _v135 = ctx.transform("textAlign", _v131["textAlign"]);
        if (_v135 !== undefined) _v131["textAlign"] = _v135;
        if (_v131["textAlign"] !== "left" && _v131["textAlign"] !== "center" && _v131["textAlign"] !== "right" && _v131["textAlign"] !== "justify") {
          ctx.errors.push({ path: path + "/textAlign", message: "expected one of: \"left\", \"center\", \"right\", \"justify\"" + ", got " + JSON.stringify(_v131["textAlign"]) });
        }
      } else {
        for (const _e of _v134.errors) ctx.errors.push(_e);
      }
    }
    if (_v131["textAlignVertical"] !== undefined) {
      const _v136: ValidationContext = { errors: [], partial: ctx.partial };
      if (_v131["textAlignVertical"] !== "top" && _v131["textAlignVertical"] !== "middle" && _v131["textAlignVertical"] !== "bottom") {
        _v136.errors.push({ path: path + "/textAlignVertical", message: "expected one of: \"top\", \"middle\", \"bottom\"" + ", got " + JSON.stringify(_v131["textAlignVertical"]) });
      }
      if (_v136.errors.length > 0 && ctx.transform) {
        const _v137 = ctx.transform("textAlignVertical", _v131["textAlignVertical"]);
        if (_v137 !== undefined) _v131["textAlignVertical"] = _v137;
        if (_v131["textAlignVertical"] !== "top" && _v131["textAlignVertical"] !== "middle" && _v131["textAlignVertical"] !== "bottom") {
          ctx.errors.push({ path: path + "/textAlignVertical", message: "expected one of: \"top\", \"middle\", \"bottom\"" + ", got " + JSON.stringify(_v131["textAlignVertical"]) });
        }
      } else {
        for (const _e of _v136.errors) ctx.errors.push(_e);
      }
    }
    if (_v131["strikethrough"] !== undefined) {
      validate_booleanOrVariable(_v131["strikethrough"], ctx, path + "/strikethrough");
    }
    if (_v131["href"] !== undefined) {
      if (typeof _v131["href"] !== "string") {
        ctx.errors.push({ path: path + "/href", message: "expected string" + ", got " + JSON.stringify(_v131["href"]) });
      }
    }
  }
}

export function validate_textContent(v: unknown, ctx: ValidationContext, path: string): void {
  if (Array.isArray(v)) {
    for (let _v138 = 0; _v138 < v.length; _v138++) {
      validate_textStyle(v[_v138], ctx, path + "/" + _v138);
      if (typeof v[_v138] !== "object" || v[_v138] === null) {
        ctx.errors.push({ path: path + "/" + _v138, message: "expected object" + ", got " + JSON.stringify(v[_v138]) });
      } else {
        const _v139 = v[_v138] as Record<string, unknown>;
        if (_v139["content"] !== undefined) {
          if (typeof _v139["content"] !== "string") {
            ctx.errors.push({ path: path + "/" + _v138 + "/content", message: "expected string" + ", got " + JSON.stringify(_v139["content"]) });
          }
        }
        for (const _v140 of Object.keys(_v139)) {
          if (_v140 !== "content" && _v140 !== "fontFamily" && _v140 !== "fontSize" && _v140 !== "fontWeight" && _v140 !== "letterSpacing" && _v140 !== "fontStyle" && _v140 !== "underline" && _v140 !== "lineHeight" && _v140 !== "textAlign" && _v140 !== "textAlignVertical" && _v140 !== "strikethrough" && _v140 !== "href") {
            ctx.errors.push({ path: path + "/" + _v138 + "/" + _v140, message: "unexpected property" + ", got " + JSON.stringify(_v140) });
          }
        }
      }
    }
  } else {
    const _v141: ValidationContext = { errors: [], partial: ctx.partial };
    let _v142 = false;
    if (!_v142) {
      const _v143: ValidationContext = { errors: [], partial: _v141.partial };
      validate_stringOrVariable(v, _v143, path);
      if (_v143.errors.length === 0) _v142 = true;
    }
    if (!_v142) {
      _v141.errors.push({ path: path, message: "expected either string or \"$variable\"" + ", got " + JSON.stringify(v) });
    }
    if (_v141.errors.length > 0) {
      ctx.errors.push({ path: path, message: "expected one of: string, \"$variable\", textStyle[]" + ", got " + JSON.stringify(v) });
    }
  }
}

export function validate_text(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveGraphics(v, ctx, path);
  validate_textStyle(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v144 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v144)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v144["type"] !== undefined) {
      if (_v144["type"] !== "text") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"text\"" + ", got " + JSON.stringify(_v144["type"]) });
      }
    }
    if (_v144["content"] !== undefined) {
      validate_textContent(_v144["content"], ctx, path + "/content");
    }
    if (_v144["textGrowth"] !== undefined) {
      const _v145: ValidationContext = { errors: [], partial: ctx.partial };
      if (_v144["textGrowth"] !== "auto" && _v144["textGrowth"] !== "fixed-width" && _v144["textGrowth"] !== "fixed-width-height") {
        _v145.errors.push({ path: path + "/textGrowth", message: "expected one of: \"auto\", \"fixed-width\", \"fixed-width-height\"" + ", got " + JSON.stringify(_v144["textGrowth"]) });
      }
      if (_v145.errors.length > 0 && ctx.transform) {
        const _v146 = ctx.transform("textGrowth", _v144["textGrowth"]);
        if (_v146 !== undefined) _v144["textGrowth"] = _v146;
        if (_v144["textGrowth"] !== "auto" && _v144["textGrowth"] !== "fixed-width" && _v144["textGrowth"] !== "fixed-width-height") {
          ctx.errors.push({ path: path + "/textGrowth", message: "expected one of: \"auto\", \"fixed-width\", \"fixed-width-height\"" + ", got " + JSON.stringify(_v144["textGrowth"]) });
        }
      } else {
        for (const _e of _v145.errors) ctx.errors.push(_e);
      }
    }
    for (const _v147 of Object.keys(_v144)) {
      if (_v147 !== "type" && _v147 !== "content" && _v147 !== "textGrowth" && _v147 !== "x" && _v147 !== "y" && _v147 !== "rotation" && _v147 !== "id" && _v147 !== "name" && _v147 !== "context" && _v147 !== "reusable" && _v147 !== "theme" && _v147 !== "enabled" && _v147 !== "opacity" && _v147 !== "flipX" && _v147 !== "flipY" && _v147 !== "layoutPosition" && _v147 !== "metadata" && _v147 !== "width" && _v147 !== "height" && _v147 !== "effect" && _v147 !== "stroke" && _v147 !== "fill" && _v147 !== "fontFamily" && _v147 !== "fontSize" && _v147 !== "fontWeight" && _v147 !== "letterSpacing" && _v147 !== "fontStyle" && _v147 !== "underline" && _v147 !== "lineHeight" && _v147 !== "textAlign" && _v147 !== "textAlignVertical" && _v147 !== "strikethrough" && _v147 !== "href") {
        ctx.errors.push({ path: path + "/" + _v147, message: "unexpected property" + ", got " + JSON.stringify(_v147) });
      }
    }
  }
}

export function validate_note(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_textStyle(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v148 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v148)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v148["type"] !== undefined) {
      if (_v148["type"] !== "note") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"note\"" + ", got " + JSON.stringify(_v148["type"]) });
      }
    }
    if (_v148["content"] !== undefined) {
      validate_textContent(_v148["content"], ctx, path + "/content");
    }
    for (const _v149 of Object.keys(_v148)) {
      if (_v149 !== "type" && _v149 !== "content" && _v149 !== "x" && _v149 !== "y" && _v149 !== "rotation" && _v149 !== "id" && _v149 !== "name" && _v149 !== "context" && _v149 !== "reusable" && _v149 !== "theme" && _v149 !== "enabled" && _v149 !== "opacity" && _v149 !== "flipX" && _v149 !== "flipY" && _v149 !== "layoutPosition" && _v149 !== "metadata" && _v149 !== "width" && _v149 !== "height" && _v149 !== "fontFamily" && _v149 !== "fontSize" && _v149 !== "fontWeight" && _v149 !== "letterSpacing" && _v149 !== "fontStyle" && _v149 !== "underline" && _v149 !== "lineHeight" && _v149 !== "textAlign" && _v149 !== "textAlignVertical" && _v149 !== "strikethrough" && _v149 !== "href") {
        ctx.errors.push({ path: path + "/" + _v149, message: "unexpected property" + ", got " + JSON.stringify(_v149) });
      }
    }
  }
}

export function validate_prompt(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_textStyle(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v150 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v150)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v150["type"] !== undefined) {
      if (_v150["type"] !== "prompt") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"prompt\"" + ", got " + JSON.stringify(_v150["type"]) });
      }
    }
    if (_v150["content"] !== undefined) {
      validate_textContent(_v150["content"], ctx, path + "/content");
    }
    if (_v150["model"] !== undefined) {
      validate_stringOrVariable(_v150["model"], ctx, path + "/model");
    }
    for (const _v151 of Object.keys(_v150)) {
      if (_v151 !== "type" && _v151 !== "content" && _v151 !== "model" && _v151 !== "x" && _v151 !== "y" && _v151 !== "rotation" && _v151 !== "id" && _v151 !== "name" && _v151 !== "context" && _v151 !== "reusable" && _v151 !== "theme" && _v151 !== "enabled" && _v151 !== "opacity" && _v151 !== "flipX" && _v151 !== "flipY" && _v151 !== "layoutPosition" && _v151 !== "metadata" && _v151 !== "width" && _v151 !== "height" && _v151 !== "fontFamily" && _v151 !== "fontSize" && _v151 !== "fontWeight" && _v151 !== "letterSpacing" && _v151 !== "fontStyle" && _v151 !== "underline" && _v151 !== "lineHeight" && _v151 !== "textAlign" && _v151 !== "textAlignVertical" && _v151 !== "strikethrough" && _v151 !== "href") {
        ctx.errors.push({ path: path + "/" + _v151, message: "unexpected property" + ", got " + JSON.stringify(_v151) });
      }
    }
  }
}

export function validate_context(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_textStyle(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v152 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v152)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v152["type"] !== undefined) {
      if (_v152["type"] !== "context") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"context\"" + ", got " + JSON.stringify(_v152["type"]) });
      }
    }
    if (_v152["content"] !== undefined) {
      validate_textContent(_v152["content"], ctx, path + "/content");
    }
    for (const _v153 of Object.keys(_v152)) {
      if (_v153 !== "type" && _v153 !== "content" && _v153 !== "x" && _v153 !== "y" && _v153 !== "rotation" && _v153 !== "id" && _v153 !== "name" && _v153 !== "context" && _v153 !== "reusable" && _v153 !== "theme" && _v153 !== "enabled" && _v153 !== "opacity" && _v153 !== "flipX" && _v153 !== "flipY" && _v153 !== "layoutPosition" && _v153 !== "metadata" && _v153 !== "width" && _v153 !== "height" && _v153 !== "fontFamily" && _v153 !== "fontSize" && _v153 !== "fontWeight" && _v153 !== "letterSpacing" && _v153 !== "fontStyle" && _v153 !== "underline" && _v153 !== "lineHeight" && _v153 !== "textAlign" && _v153 !== "textAlignVertical" && _v153 !== "strikethrough" && _v153 !== "href") {
        ctx.errors.push({ path: path + "/" + _v153, message: "unexpected property" + ", got " + JSON.stringify(_v153) });
      }
    }
  }
}

export function validate_iconFont(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  validate_size(v, ctx, path);
  validate_canHaveEffects(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v154 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v154)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v154["type"] !== undefined) {
      if (_v154["type"] !== "icon_font") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"icon_font\"" + ", got " + JSON.stringify(_v154["type"]) });
      }
    }
    if (_v154["iconFontName"] !== undefined) {
      validate_stringOrVariable(_v154["iconFontName"], ctx, path + "/iconFontName");
    }
    if (_v154["iconFontFamily"] !== undefined) {
      validate_stringOrVariable(_v154["iconFontFamily"], ctx, path + "/iconFontFamily");
    }
    if (_v154["weight"] !== undefined) {
      validate_numberOrVariable(_v154["weight"], ctx, path + "/weight");
    }
    if (_v154["fill"] !== undefined) {
      const _v155: ValidationContext = { errors: [], partial: ctx.partial };
      validate_fills(_v154["fill"], _v155, path + "/fill");
      if (_v155.errors.length > 0 && ctx.transform) {
        const _v156 = ctx.transform("color", _v154["fill"]);
        if (_v156 !== undefined) _v154["fill"] = _v156;
        validate_fills(_v154["fill"], ctx, path + "/fill");
      } else {
        for (const _e of _v155.errors) ctx.errors.push(_e);
      }
    }
    for (const _v157 of Object.keys(_v154)) {
      if (_v157 !== "type" && _v157 !== "iconFontName" && _v157 !== "iconFontFamily" && _v157 !== "weight" && _v157 !== "fill" && _v157 !== "x" && _v157 !== "y" && _v157 !== "rotation" && _v157 !== "id" && _v157 !== "name" && _v157 !== "context" && _v157 !== "reusable" && _v157 !== "theme" && _v157 !== "enabled" && _v157 !== "opacity" && _v157 !== "flipX" && _v157 !== "flipY" && _v157 !== "layoutPosition" && _v157 !== "metadata" && _v157 !== "width" && _v157 !== "height" && _v157 !== "effect") {
        ctx.errors.push({ path: path + "/" + _v157, message: "unexpected property" + ", got " + JSON.stringify(_v157) });
      }
    }
  }
}

export function validate_idPath(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "string") {
    ctx.errors.push({ path: path, message: "expected slash-separated path of IDs" + ", got " + JSON.stringify(v) });
  } else if (!_re4.test(v)) {
    ctx.errors.push({ path: path, message: "expected slash-separated path of IDs" + ", got " + JSON.stringify(v) });
  }
}

export function validate_ref(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v158 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v158)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v158["type"] !== undefined) {
      if (_v158["type"] !== "ref") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"ref\"" + ", got " + JSON.stringify(_v158["type"]) });
      }
    }
    if (!ctx.partial && !("ref" in _v158)) {
      ctx.errors.push({ path: path + "/ref", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v158["ref"] !== undefined) {
      if (typeof _v158["ref"] !== "string") {
        ctx.errors.push({ path: path + "/ref", message: "expected string without slashes" + ", got " + JSON.stringify(_v158["ref"]) });
      } else if (!_re2.test(_v158["ref"])) {
        ctx.errors.push({ path: path + "/ref", message: "expected string without slashes" + ", got " + JSON.stringify(_v158["ref"]) });
      }
    }
    if (_v158["descendants"] !== undefined) {
      if (typeof _v158["descendants"] !== "object" || _v158["descendants"] === null) {
        ctx.errors.push({ path: path + "/descendants", message: "expected object" + ", got " + JSON.stringify(_v158["descendants"]) });
      } else {
        const _v159 = _v158["descendants"] as Record<string, unknown>;
        for (const _v160 of Object.keys(_v159)) {
          validate_idPath(_v160, ctx, path + "/descendants" + "/" + _v160);
          if (typeof _v159[_v160] !== "object" || _v159[_v160] === null) {
            ctx.errors.push({ path: path + "/descendants" + "/" + _v160, message: "expected object" + ", got " + JSON.stringify(_v159[_v160]) });
          } else {
            const _v161 = _v159[_v160] as Record<string, unknown>;
          }
        }
      }
    }
  }
}

export function validate_child(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected one of: \"frame\", \"group\", \"rectangle\", \"ellipse\", \"line\", \"path\", \"polygon\", \"text\", \"note\", \"prompt\", \"context\", \"icon_font\", \"ref\"" + ", got " + JSON.stringify(v) });
  } else {
    const _v162 = v as Record<string, unknown>;
    switch (_v162["type"]) {
      case "frame":
        validate_frame(v, ctx, path);
        break;
      case "group":
        validate_group(v, ctx, path);
        break;
      case "rectangle":
        validate_rectangle(v, ctx, path);
        break;
      case "ellipse":
        validate_ellipse(v, ctx, path);
        break;
      case "line":
        validate_line(v, ctx, path);
        break;
      case "path":
        validate_path(v, ctx, path);
        break;
      case "polygon":
        validate_polygon(v, ctx, path);
        break;
      case "text":
        validate_text(v, ctx, path);
        break;
      case "note":
        validate_note(v, ctx, path);
        break;
      case "prompt":
        validate_prompt(v, ctx, path);
        break;
      case "context":
        validate_context(v, ctx, path);
        break;
      case "icon_font":
        validate_iconFont(v, ctx, path);
        break;
      case "ref":
        validate_ref(v, ctx, path);
        break;
      default:
        ctx.errors.push({ path: path + "/type", message: "expected one of: \"frame\", \"group\", \"rectangle\", \"ellipse\", \"line\", \"path\", \"polygon\", \"text\", \"note\", \"prompt\", \"context\", \"icon_font\", \"ref\"" + ", got " + JSON.stringify(_v162["type"]) });
    }
  }
}

export function validate_canHaveChildren(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v163 = v as Record<string, unknown>;
    if (_v163["children"] !== undefined) {
      if (!Array.isArray(_v163["children"])) {
        ctx.errors.push({ path: path + "/children", message: "expected array" + ", got " + JSON.stringify(_v163["children"]) });
      } else {
        for (let _v164 = 0; _v164 < _v163["children"].length; _v164++) {
          validate_child(_v163["children"][_v164], ctx, path + "/children" + "/" + _v164);
        }
      }
    }
  }
}

export function validate_frame(v: unknown, ctx: ValidationContext, path: string): void {
  validate_rectangleish(v, ctx, path);
  validate_canHaveChildren(v, ctx, path);
  validate_layout(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v165 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v165)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v165["type"] !== undefined) {
      if (_v165["type"] !== "frame") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"frame\"" + ", got " + JSON.stringify(_v165["type"]) });
      }
    }
    if (_v165["clip"] !== undefined) {
      validate_booleanOrVariable(_v165["clip"], ctx, path + "/clip");
    }
    if (_v165["placeholder"] !== undefined) {
      if (typeof _v165["placeholder"] !== "boolean") {
        ctx.errors.push({ path: path + "/placeholder", message: "expected boolean" + ", got " + JSON.stringify(_v165["placeholder"]) });
      }
    }
    if (_v165["slot"] !== undefined) {
      if (typeof _v165["slot"] === "boolean") {
        const _v166: ValidationContext = { errors: [], partial: ctx.partial };
        let _v167 = false;
        if (!_v167) {
          const _v168: ValidationContext = { errors: [], partial: _v166.partial };
          if (_v165["slot"] !== false) {
            _v168.errors.push({ path: path + "/slot", message: "expected " + "false" + ", got " + JSON.stringify(_v165["slot"]) });
          }
          if (_v168.errors.length === 0) _v167 = true;
        }
        if (!_v167) {
          _v166.errors.push({ path: path + "/slot", message: "expected one of: false" + ", got " + JSON.stringify(_v165["slot"]) });
        }
        if (_v166.errors.length > 0) {
          ctx.errors.push({ path: path + "/slot", message: "expected either false or string[]" + ", got " + JSON.stringify(_v165["slot"]) });
        }
      } else if (Array.isArray(_v165["slot"])) {
        for (let _v169 = 0; _v169 < _v165["slot"].length; _v169++) {
          if (typeof _v165["slot"][_v169] !== "string") {
            ctx.errors.push({ path: path + "/slot" + "/" + _v169, message: "expected string" + ", got " + JSON.stringify(_v165["slot"][_v169]) });
          }
        }
      } else {
        ctx.errors.push({ path: path + "/slot", message: "expected either false or string[]" + ", got " + JSON.stringify(_v165["slot"]) });
      }
    }
    for (const _v170 of Object.keys(_v165)) {
      if (_v170 !== "type" && _v170 !== "clip" && _v170 !== "placeholder" && _v170 !== "slot" && _v170 !== "x" && _v170 !== "y" && _v170 !== "rotation" && _v170 !== "id" && _v170 !== "name" && _v170 !== "context" && _v170 !== "reusable" && _v170 !== "theme" && _v170 !== "enabled" && _v170 !== "opacity" && _v170 !== "flipX" && _v170 !== "flipY" && _v170 !== "layoutPosition" && _v170 !== "metadata" && _v170 !== "width" && _v170 !== "height" && _v170 !== "effect" && _v170 !== "stroke" && _v170 !== "fill" && _v170 !== "cornerRadius" && _v170 !== "children" && _v170 !== "layout" && _v170 !== "gap" && _v170 !== "layoutIncludeStroke" && _v170 !== "padding" && _v170 !== "justifyContent" && _v170 !== "alignItems") {
        ctx.errors.push({ path: path + "/" + _v170, message: "unexpected property" + ", got " + JSON.stringify(_v170) });
      }
    }
  }
}

export function validate_connectionAnchor(v: unknown, ctx: ValidationContext, path: string): void {
  if (v !== "center" && v !== "top" && v !== "left" && v !== "bottom" && v !== "right") {
    ctx.errors.push({ path: path, message: "expected one of: \"center\", \"top\", \"left\", \"bottom\", \"right\"" + ", got " + JSON.stringify(v) });
  }
}

export function validate_connectionEndpoint(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v171 = v as Record<string, unknown>;
    if (!ctx.partial && !("path" in _v171)) {
      ctx.errors.push({ path: path + "/path", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v171["path"] !== undefined) {
      validate_idPath(_v171["path"], ctx, path + "/path");
    }
    if (!ctx.partial && !("anchor" in _v171)) {
      ctx.errors.push({ path: path + "/anchor", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v171["anchor"] !== undefined) {
      validate_connectionAnchor(_v171["anchor"], ctx, path + "/anchor");
    }
    for (const _v172 of Object.keys(_v171)) {
      if (_v172 !== "path" && _v172 !== "anchor") {
        ctx.errors.push({ path: path + "/" + _v172, message: "unexpected property" + ", got " + JSON.stringify(_v172) });
      }
    }
  }
}

export function validate_connection(v: unknown, ctx: ValidationContext, path: string): void {
  validate_entity(v, ctx, path);
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v173 = v as Record<string, unknown>;
    if (!ctx.partial && !("type" in _v173)) {
      ctx.errors.push({ path: path + "/type", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v173["type"] !== undefined) {
      if (_v173["type"] !== "connection") {
        ctx.errors.push({ path: path + "/type", message: "expected " + "\"connection\"" + ", got " + JSON.stringify(_v173["type"]) });
      }
    }
    if (!ctx.partial && !("source" in _v173)) {
      ctx.errors.push({ path: path + "/source", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v173["source"] !== undefined) {
      validate_connectionEndpoint(_v173["source"], ctx, path + "/source");
    }
    if (!ctx.partial && !("target" in _v173)) {
      ctx.errors.push({ path: path + "/target", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v173["target"] !== undefined) {
      validate_connectionEndpoint(_v173["target"], ctx, path + "/target");
    }
    if (_v173["stroke"] !== undefined) {
      validate_stroke(_v173["stroke"], ctx, path + "/stroke");
    }
    for (const _v174 of Object.keys(_v173)) {
      if (_v174 !== "type" && _v174 !== "source" && _v174 !== "target" && _v174 !== "stroke" && _v174 !== "x" && _v174 !== "y" && _v174 !== "rotation" && _v174 !== "id" && _v174 !== "name" && _v174 !== "context" && _v174 !== "reusable" && _v174 !== "theme" && _v174 !== "enabled" && _v174 !== "opacity" && _v174 !== "flipX" && _v174 !== "flipY" && _v174 !== "layoutPosition" && _v174 !== "metadata") {
        ctx.errors.push({ path: path + "/" + _v174, message: "unexpected property" + ", got " + JSON.stringify(_v174) });
      }
    }
  }
}

export function validate_document(v: unknown, ctx: ValidationContext, path: string): void {
  if (typeof v !== "object" || v === null) {
    ctx.errors.push({ path: path, message: "expected object" + ", got " + JSON.stringify(v) });
  } else {
    const _v175 = v as Record<string, unknown>;
    if (!ctx.partial && !("version" in _v175)) {
      ctx.errors.push({ path: path + "/version", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v175["version"] !== undefined) {
      if (_v175["version"] !== "2.10") {
        ctx.errors.push({ path: path + "/version", message: "expected " + "\"2.10\"" + ", got " + JSON.stringify(_v175["version"]) });
      }
    }
    if (_v175["fonts"] !== undefined) {
      if (!Array.isArray(_v175["fonts"])) {
        ctx.errors.push({ path: path + "/fonts", message: "expected array" + ", got " + JSON.stringify(_v175["fonts"]) });
      } else {
        for (let _v176 = 0; _v176 < _v175["fonts"].length; _v176++) {
          if (typeof _v175["fonts"][_v176] !== "object" || _v175["fonts"][_v176] === null) {
            ctx.errors.push({ path: path + "/fonts" + "/" + _v176, message: "expected object" + ", got " + JSON.stringify(_v175["fonts"][_v176]) });
          } else {
            const _v177 = _v175["fonts"][_v176] as Record<string, unknown>;
            if (_v177["name"] !== undefined) {
              if (typeof _v177["name"] !== "string") {
                ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/name", message: "expected string" + ", got " + JSON.stringify(_v177["name"]) });
              }
            }
            if (_v177["url"] !== undefined) {
              if (typeof _v177["url"] !== "string") {
                ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/url", message: "expected string" + ", got " + JSON.stringify(_v177["url"]) });
              }
            }
            if (_v177["style"] !== undefined) {
              if (_v177["style"] !== "normal" && _v177["style"] !== "italic") {
                ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/style", message: "expected one of: \"normal\", \"italic\"" + ", got " + JSON.stringify(_v177["style"]) });
              }
            }
            if (_v177["weight"] !== undefined) {
              if (Array.isArray(_v177["weight"])) {
                if (_v177["weight"].length !== 2) {
                  ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/weight", message: "expected either number or number[2]" + ", got " + JSON.stringify(_v177["weight"]) });
                } else {
                  for (let _v178 = 0; _v178 < _v177["weight"].length; _v178++) {
                    if (typeof _v177["weight"][_v178] !== "number") {
                      ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/weight" + "/" + _v178, message: "expected number" + ", got " + JSON.stringify(_v177["weight"][_v178]) });
                    }
                  }
                }
              } else if (!(typeof _v177["weight"] === "number")) {
                ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/weight", message: "expected either number or number[2]" + ", got " + JSON.stringify(_v177["weight"]) });
              }
            }
            if (_v177["axes"] !== undefined) {
              if (!Array.isArray(_v177["axes"])) {
                ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/axes", message: "expected array" + ", got " + JSON.stringify(_v177["axes"]) });
              } else {
                for (let _v179 = 0; _v179 < _v177["axes"].length; _v179++) {
                  if (typeof _v177["axes"][_v179] !== "object" || _v177["axes"][_v179] === null) {
                    ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/axes" + "/" + _v179, message: "expected object" + ", got " + JSON.stringify(_v177["axes"][_v179]) });
                  } else {
                    const _v180 = _v177["axes"][_v179] as Record<string, unknown>;
                    if (_v180["tag"] !== undefined) {
                      if (typeof _v180["tag"] !== "string") {
                        ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/axes" + "/" + _v179 + "/tag", message: "expected string" + ", got " + JSON.stringify(_v180["tag"]) });
                      }
                    }
                    if (_v180["start"] !== undefined) {
                      if (typeof _v180["start"] !== "number") {
                        ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/axes" + "/" + _v179 + "/start", message: "expected number" + ", got " + JSON.stringify(_v180["start"]) });
                      }
                    }
                    if (_v180["end"] !== undefined) {
                      if (typeof _v180["end"] !== "number") {
                        ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/axes" + "/" + _v179 + "/end", message: "expected number" + ", got " + JSON.stringify(_v180["end"]) });
                      }
                    }
                    for (const _v181 of Object.keys(_v180)) {
                      if (_v181 !== "tag" && _v181 !== "start" && _v181 !== "end") {
                        ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/axes" + "/" + _v179 + "/" + _v181, message: "unexpected property" + ", got " + JSON.stringify(_v181) });
                      }
                    }
                  }
                }
              }
            }
            for (const _v182 of Object.keys(_v177)) {
              if (_v182 !== "name" && _v182 !== "url" && _v182 !== "style" && _v182 !== "weight" && _v182 !== "axes") {
                ctx.errors.push({ path: path + "/fonts" + "/" + _v176 + "/" + _v182, message: "unexpected property" + ", got " + JSON.stringify(_v182) });
              }
            }
          }
        }
      }
    }
    if (_v175["themes"] !== undefined) {
      if (typeof _v175["themes"] !== "object" || _v175["themes"] === null) {
        ctx.errors.push({ path: path + "/themes", message: "expected object" + ", got " + JSON.stringify(_v175["themes"]) });
      } else {
        const _v183 = _v175["themes"] as Record<string, unknown>;
        for (const _v184 of Object.keys(_v183)) {
          if (_re5.test(_v184)) {
            if (!Array.isArray(_v183[_v184])) {
              ctx.errors.push({ path: path + "/themes" + "/" + _v184, message: "expected array" + ", got " + JSON.stringify(_v183[_v184]) });
            } else {
              if (_v183[_v184].length < 1) {
                ctx.errors.push({ path: path + "/themes" + "/" + _v184, message: "expected at least 1 items" + ", got " + JSON.stringify(_v183[_v184].length) });
              }
              for (let _v185 = 0; _v185 < _v183[_v184].length; _v185++) {
                if (typeof _v183[_v184][_v185] !== "string") {
                  ctx.errors.push({ path: path + "/themes" + "/" + _v184 + "/" + _v185, message: "expected string" + ", got " + JSON.stringify(_v183[_v184][_v185]) });
                }
              }
            }
          }
        }
      }
    }
    if (_v175["imports"] !== undefined) {
      if (typeof _v175["imports"] !== "object" || _v175["imports"] === null) {
        ctx.errors.push({ path: path + "/imports", message: "expected object" + ", got " + JSON.stringify(_v175["imports"]) });
      } else {
        const _v186 = _v175["imports"] as Record<string, unknown>;
        for (const _v187 of Object.keys(_v186)) {
          if (typeof _v186[_v187] !== "string") {
            ctx.errors.push({ path: path + "/imports" + "/" + _v187, message: "expected string" + ", got " + JSON.stringify(_v186[_v187]) });
          }
        }
      }
    }
    if (_v175["variables"] !== undefined) {
      if (typeof _v175["variables"] !== "object" || _v175["variables"] === null) {
        ctx.errors.push({ path: path + "/variables", message: "expected object" + ", got " + JSON.stringify(_v175["variables"]) });
      } else {
        const _v188 = _v175["variables"] as Record<string, unknown>;
        for (const _v189 of Object.keys(_v188)) {
          if (_re5.test(_v189)) {
            if (typeof _v188[_v189] !== "object" || _v188[_v189] === null) {
              ctx.errors.push({ path: path + "/variables" + "/" + _v189, message: "expected one of: \"boolean\", \"color\", \"number\", \"string\"" + ", got " + JSON.stringify(_v188[_v189]) });
            } else {
              const _v190 = _v188[_v189] as Record<string, unknown>;
              switch (_v190["type"]) {
                case "boolean":
                  if (typeof _v188[_v189] !== "object" || _v188[_v189] === null) {
                    ctx.errors.push({ path: path + "/variables" + "/" + _v189, message: "expected object" + ", got " + JSON.stringify(_v188[_v189]) });
                  } else {
                    const _v191 = _v188[_v189] as Record<string, unknown>;
                    if (!ctx.partial && !("type" in _v191)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v191["type"] !== undefined) {
                      if (_v191["type"] !== "boolean") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "expected " + "\"boolean\"" + ", got " + JSON.stringify(_v191["type"]) });
                      }
                    }
                    if (!ctx.partial && !("value" in _v191)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v191["value"] !== undefined) {
                      if (Array.isArray(_v191["value"])) {
                        for (let _v192 = 0; _v192 < _v191["value"].length; _v192++) {
                          if (typeof _v191["value"][_v192] !== "object" || _v191["value"][_v192] === null) {
                            ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v192, message: "expected object" + ", got " + JSON.stringify(_v191["value"][_v192]) });
                          } else {
                            const _v193 = _v191["value"][_v192] as Record<string, unknown>;
                            if (!ctx.partial && !("value" in _v193)) {
                              ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v192 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v191["value"][_v192]) });
                            } else if (_v193["value"] !== undefined) {
                              validate_booleanOrVariable(_v193["value"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v192 + "/value");
                            }
                            if (_v193["theme"] !== undefined) {
                              validate_theme(_v193["theme"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v192 + "/theme");
                            }
                            for (const _v194 of Object.keys(_v193)) {
                              if (_v194 !== "value" && _v194 !== "theme") {
                                ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v192 + "/" + _v194, message: "unexpected property" + ", got " + JSON.stringify(_v194) });
                              }
                            }
                          }
                        }
                      } else {
                        const _v195: ValidationContext = { errors: [], partial: ctx.partial };
                        let _v196 = false;
                        if (!_v196) {
                          const _v197: ValidationContext = { errors: [], partial: _v195.partial };
                          validate_booleanOrVariable(_v191["value"], _v197, path + "/variables" + "/" + _v189 + "/value");
                          if (_v197.errors.length === 0) _v196 = true;
                        }
                        if (!_v196) {
                          _v195.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected either boolean or \"$variable\"" + ", got " + JSON.stringify(_v191["value"]) });
                        }
                        if (_v195.errors.length > 0) {
                          ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected one of: boolean, \"$variable\", object[]" + ", got " + JSON.stringify(_v191["value"]) });
                        }
                      }
                    }
                    for (const _v198 of Object.keys(_v191)) {
                      if (_v198 !== "type" && _v198 !== "value") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/" + _v198, message: "unexpected property" + ", got " + JSON.stringify(_v198) });
                      }
                    }
                  }
                  break;
                case "color":
                  if (typeof _v188[_v189] !== "object" || _v188[_v189] === null) {
                    ctx.errors.push({ path: path + "/variables" + "/" + _v189, message: "expected object" + ", got " + JSON.stringify(_v188[_v189]) });
                  } else {
                    const _v199 = _v188[_v189] as Record<string, unknown>;
                    if (!ctx.partial && !("type" in _v199)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v199["type"] !== undefined) {
                      if (_v199["type"] !== "color") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "expected " + "\"color\"" + ", got " + JSON.stringify(_v199["type"]) });
                      }
                    }
                    if (!ctx.partial && !("value" in _v199)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v199["value"] !== undefined) {
                      const _v200: ValidationContext = { errors: [], partial: ctx.partial };
                      if (Array.isArray(_v199["value"])) {
                        for (let _v201 = 0; _v201 < _v199["value"].length; _v201++) {
                          if (typeof _v199["value"][_v201] !== "object" || _v199["value"][_v201] === null) {
                            _v200.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v201, message: "expected object" + ", got " + JSON.stringify(_v199["value"][_v201]) });
                          } else {
                            const _v202 = _v199["value"][_v201] as Record<string, unknown>;
                            if (!_v200.partial && !("value" in _v202)) {
                              _v200.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v201 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v199["value"][_v201]) });
                            } else if (_v202["value"] !== undefined) {
                              const _v203: ValidationContext = { errors: [], partial: _v200.partial };
                              validate_colorOrVariable(_v202["value"], _v203, path + "/variables" + "/" + _v189 + "/value" + "/" + _v201 + "/value");
                              if (_v203.errors.length > 0 && _v200.transform) {
                                const _v204 = _v200.transform("color", _v202["value"]);
                                if (_v204 !== undefined) _v202["value"] = _v204;
                                validate_colorOrVariable(_v202["value"], _v200, path + "/variables" + "/" + _v189 + "/value" + "/" + _v201 + "/value");
                              } else {
                                for (const _e of _v203.errors) _v200.errors.push(_e);
                              }
                            }
                            if (_v202["theme"] !== undefined) {
                              validate_theme(_v202["theme"], _v200, path + "/variables" + "/" + _v189 + "/value" + "/" + _v201 + "/theme");
                            }
                            for (const _v205 of Object.keys(_v202)) {
                              if (_v205 !== "value" && _v205 !== "theme") {
                                _v200.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v201 + "/" + _v205, message: "unexpected property" + ", got " + JSON.stringify(_v205) });
                              }
                            }
                          }
                        }
                      } else {
                        const _v206: ValidationContext = { errors: [], partial: _v200.partial };
                        let _v207 = false;
                        if (!_v207) {
                          const _v208: ValidationContext = { errors: [], partial: _v206.partial };
                          validate_colorOrVariable(_v199["value"], _v208, path + "/variables" + "/" + _v189 + "/value");
                          if (_v208.errors.length === 0) _v207 = true;
                        }
                        if (!_v207) {
                          _v206.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected either color hex string (#RRGGBBAA, #RRGGBB or #RGB) or \"$variable\"" + ", got " + JSON.stringify(_v199["value"]) });
                        }
                        if (_v206.errors.length > 0) {
                          _v200.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected one of: color hex string (#RRGGBBAA, #RRGGBB or #RGB), \"$variable\", object[]" + ", got " + JSON.stringify(_v199["value"]) });
                        }
                      }
                      if (_v200.errors.length > 0 && ctx.transform) {
                        const _v209 = ctx.transform("color", _v199["value"]);
                        if (_v209 !== undefined) _v199["value"] = _v209;
                        if (Array.isArray(_v199["value"])) {
                          for (let _v210 = 0; _v210 < _v199["value"].length; _v210++) {
                            if (typeof _v199["value"][_v210] !== "object" || _v199["value"][_v210] === null) {
                              ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v210, message: "expected object" + ", got " + JSON.stringify(_v199["value"][_v210]) });
                            } else {
                              const _v211 = _v199["value"][_v210] as Record<string, unknown>;
                              if (!ctx.partial && !("value" in _v211)) {
                                ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v210 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v199["value"][_v210]) });
                              } else if (_v211["value"] !== undefined) {
                                const _v212: ValidationContext = { errors: [], partial: ctx.partial };
                                validate_colorOrVariable(_v211["value"], _v212, path + "/variables" + "/" + _v189 + "/value" + "/" + _v210 + "/value");
                                if (_v212.errors.length > 0 && ctx.transform) {
                                  const _v213 = ctx.transform("color", _v211["value"]);
                                  if (_v213 !== undefined) _v211["value"] = _v213;
                                  validate_colorOrVariable(_v211["value"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v210 + "/value");
                                } else {
                                  for (const _e of _v212.errors) ctx.errors.push(_e);
                                }
                              }
                              if (_v211["theme"] !== undefined) {
                                validate_theme(_v211["theme"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v210 + "/theme");
                              }
                              for (const _v214 of Object.keys(_v211)) {
                                if (_v214 !== "value" && _v214 !== "theme") {
                                  ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v210 + "/" + _v214, message: "unexpected property" + ", got " + JSON.stringify(_v214) });
                                }
                              }
                            }
                          }
                        } else {
                          const _v215: ValidationContext = { errors: [], partial: ctx.partial };
                          let _v216 = false;
                          if (!_v216) {
                            const _v217: ValidationContext = { errors: [], partial: _v215.partial };
                            validate_colorOrVariable(_v199["value"], _v217, path + "/variables" + "/" + _v189 + "/value");
                            if (_v217.errors.length === 0) _v216 = true;
                          }
                          if (!_v216) {
                            _v215.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected either color hex string (#RRGGBBAA, #RRGGBB or #RGB) or \"$variable\"" + ", got " + JSON.stringify(_v199["value"]) });
                          }
                          if (_v215.errors.length > 0) {
                            ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected one of: color hex string (#RRGGBBAA, #RRGGBB or #RGB), \"$variable\", object[]" + ", got " + JSON.stringify(_v199["value"]) });
                          }
                        }
                      } else {
                        for (const _e of _v200.errors) ctx.errors.push(_e);
                      }
                    }
                    for (const _v218 of Object.keys(_v199)) {
                      if (_v218 !== "type" && _v218 !== "value") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/" + _v218, message: "unexpected property" + ", got " + JSON.stringify(_v218) });
                      }
                    }
                  }
                  break;
                case "number":
                  if (typeof _v188[_v189] !== "object" || _v188[_v189] === null) {
                    ctx.errors.push({ path: path + "/variables" + "/" + _v189, message: "expected object" + ", got " + JSON.stringify(_v188[_v189]) });
                  } else {
                    const _v219 = _v188[_v189] as Record<string, unknown>;
                    if (!ctx.partial && !("type" in _v219)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v219["type"] !== undefined) {
                      if (_v219["type"] !== "number") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "expected " + "\"number\"" + ", got " + JSON.stringify(_v219["type"]) });
                      }
                    }
                    if (!ctx.partial && !("value" in _v219)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v219["value"] !== undefined) {
                      if (Array.isArray(_v219["value"])) {
                        for (let _v220 = 0; _v220 < _v219["value"].length; _v220++) {
                          if (typeof _v219["value"][_v220] !== "object" || _v219["value"][_v220] === null) {
                            ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v220, message: "expected object" + ", got " + JSON.stringify(_v219["value"][_v220]) });
                          } else {
                            const _v221 = _v219["value"][_v220] as Record<string, unknown>;
                            if (!ctx.partial && !("value" in _v221)) {
                              ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v220 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v219["value"][_v220]) });
                            } else if (_v221["value"] !== undefined) {
                              validate_numberOrVariable(_v221["value"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v220 + "/value");
                            }
                            if (_v221["theme"] !== undefined) {
                              validate_theme(_v221["theme"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v220 + "/theme");
                            }
                            for (const _v222 of Object.keys(_v221)) {
                              if (_v222 !== "value" && _v222 !== "theme") {
                                ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v220 + "/" + _v222, message: "unexpected property" + ", got " + JSON.stringify(_v222) });
                              }
                            }
                          }
                        }
                      } else {
                        const _v223: ValidationContext = { errors: [], partial: ctx.partial };
                        let _v224 = false;
                        if (!_v224) {
                          const _v225: ValidationContext = { errors: [], partial: _v223.partial };
                          validate_numberOrVariable(_v219["value"], _v225, path + "/variables" + "/" + _v189 + "/value");
                          if (_v225.errors.length === 0) _v224 = true;
                        }
                        if (!_v224) {
                          _v223.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected either number or \"$variable\"" + ", got " + JSON.stringify(_v219["value"]) });
                        }
                        if (_v223.errors.length > 0) {
                          ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected one of: number, \"$variable\", object[]" + ", got " + JSON.stringify(_v219["value"]) });
                        }
                      }
                    }
                    for (const _v226 of Object.keys(_v219)) {
                      if (_v226 !== "type" && _v226 !== "value") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/" + _v226, message: "unexpected property" + ", got " + JSON.stringify(_v226) });
                      }
                    }
                  }
                  break;
                case "string":
                  if (typeof _v188[_v189] !== "object" || _v188[_v189] === null) {
                    ctx.errors.push({ path: path + "/variables" + "/" + _v189, message: "expected object" + ", got " + JSON.stringify(_v188[_v189]) });
                  } else {
                    const _v227 = _v188[_v189] as Record<string, unknown>;
                    if (!ctx.partial && !("type" in _v227)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v227["type"] !== undefined) {
                      if (_v227["type"] !== "string") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "expected " + "\"string\"" + ", got " + JSON.stringify(_v227["type"]) });
                      }
                    }
                    if (!ctx.partial && !("value" in _v227)) {
                      ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v188[_v189]) });
                    } else if (_v227["value"] !== undefined) {
                      if (Array.isArray(_v227["value"])) {
                        for (let _v228 = 0; _v228 < _v227["value"].length; _v228++) {
                          if (typeof _v227["value"][_v228] !== "object" || _v227["value"][_v228] === null) {
                            ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v228, message: "expected object" + ", got " + JSON.stringify(_v227["value"][_v228]) });
                          } else {
                            const _v229 = _v227["value"][_v228] as Record<string, unknown>;
                            if (!ctx.partial && !("value" in _v229)) {
                              ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v228 + "/value", message: "missing required property" + ", got " + JSON.stringify(_v227["value"][_v228]) });
                            } else if (_v229["value"] !== undefined) {
                              validate_stringOrVariable(_v229["value"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v228 + "/value");
                            }
                            if (_v229["theme"] !== undefined) {
                              validate_theme(_v229["theme"], ctx, path + "/variables" + "/" + _v189 + "/value" + "/" + _v228 + "/theme");
                            }
                            for (const _v230 of Object.keys(_v229)) {
                              if (_v230 !== "value" && _v230 !== "theme") {
                                ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value" + "/" + _v228 + "/" + _v230, message: "unexpected property" + ", got " + JSON.stringify(_v230) });
                              }
                            }
                          }
                        }
                      } else {
                        const _v231: ValidationContext = { errors: [], partial: ctx.partial };
                        let _v232 = false;
                        if (!_v232) {
                          const _v233: ValidationContext = { errors: [], partial: _v231.partial };
                          validate_stringOrVariable(_v227["value"], _v233, path + "/variables" + "/" + _v189 + "/value");
                          if (_v233.errors.length === 0) _v232 = true;
                        }
                        if (!_v232) {
                          _v231.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected either string or \"$variable\"" + ", got " + JSON.stringify(_v227["value"]) });
                        }
                        if (_v231.errors.length > 0) {
                          ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/value", message: "expected one of: string, \"$variable\", object[]" + ", got " + JSON.stringify(_v227["value"]) });
                        }
                      }
                    }
                    for (const _v234 of Object.keys(_v227)) {
                      if (_v234 !== "type" && _v234 !== "value") {
                        ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/" + _v234, message: "unexpected property" + ", got " + JSON.stringify(_v234) });
                      }
                    }
                  }
                  break;
                default:
                  ctx.errors.push({ path: path + "/variables" + "/" + _v189 + "/type", message: "expected one of: \"boolean\", \"color\", \"number\", \"string\"" + ", got " + JSON.stringify(_v190["type"]) });
              }
            }
          }
        }
      }
    }
    if (!ctx.partial && !("children" in _v175)) {
      ctx.errors.push({ path: path + "/children", message: "missing required property" + ", got " + JSON.stringify(v) });
    } else if (_v175["children"] !== undefined) {
      if (!Array.isArray(_v175["children"])) {
        ctx.errors.push({ path: path + "/children", message: "expected array" + ", got " + JSON.stringify(_v175["children"]) });
      } else {
        for (let _v235 = 0; _v235 < _v175["children"].length; _v235++) {
          if (typeof _v175["children"][_v235] !== "object" || _v175["children"][_v235] === null) {
            ctx.errors.push({ path: path + "/children" + "/" + _v235, message: "expected one of: \"frame\", \"group\", \"rectangle\", \"ellipse\", \"line\", \"polygon\", \"path\", \"text\", \"connection\", \"note\", \"context\", \"prompt\", \"icon_font\", \"ref\"" + ", got " + JSON.stringify(_v175["children"][_v235]) });
          } else {
            const _v236 = _v175["children"][_v235] as Record<string, unknown>;
            switch (_v236["type"]) {
              case "frame":
                validate_frame(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "group":
                validate_group(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "rectangle":
                validate_rectangle(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "ellipse":
                validate_ellipse(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "line":
                validate_line(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "polygon":
                validate_polygon(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "path":
                validate_path(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "text":
                validate_text(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "connection":
                validate_connection(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "note":
                validate_note(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "context":
                validate_context(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "prompt":
                validate_prompt(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "icon_font":
                validate_iconFont(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              case "ref":
                validate_ref(_v175["children"][_v235], ctx, path + "/children" + "/" + _v235);
                break;
              default:
                ctx.errors.push({ path: path + "/children" + "/" + _v235 + "/type", message: "expected one of: \"frame\", \"group\", \"rectangle\", \"ellipse\", \"line\", \"polygon\", \"path\", \"text\", \"connection\", \"note\", \"context\", \"prompt\", \"icon_font\", \"ref\"" + ", got " + JSON.stringify(_v236["type"]) });
            }
          }
        }
      }
    }
    for (const _v237 of Object.keys(_v175)) {
      if (_v237 !== "version" && _v237 !== "fonts" && _v237 !== "themes" && _v237 !== "imports" && _v237 !== "variables" && _v237 !== "children") {
        ctx.errors.push({ path: path + "/" + _v237, message: "unexpected property" + ", got " + JSON.stringify(_v237) });
      }
    }
  }
}

const _re0 = new RegExp("^\\$");
const _re1 = new RegExp("^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$");
const _re2 = new RegExp("^[^/]+$");
const _re3 = new RegExp("^(fit_content|fill_container)(\\(-?[0-9]+(\\.[0-9]+)?\\))?$");
const _re4 = new RegExp("^[^/]+(/[^/]+)*$");
const _re5 = new RegExp("[^:]+");