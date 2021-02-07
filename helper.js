export function type_check_v1(variable, type){

    switch(typeof variable) {
        case "number":
        case "symbol":
        case "string":
        case "boolean":
        case "undefiened":
        case "function":
            return type === typeof variable;
        case "object":
            switch (type){
                case "null" :
                    return variable === null;
                case "array":
                    return Array.isArray(variable);
                default:
                    return variable !== null && !Array.isArray(variable);
            }
    }
}

export function type_check_v2(variable, conf) {

    for (toCheck in conf) 
        switch(toCheck) {
            case "type":
                if(type_check_v1(variable,conf.type) === false) return false;
            case "value":
            case "enum":
                return type === typeof variable;
            case "object":
                switch (type){
                    case "null" :
                        return variable === null;
                    case "array":
                        return Array.isArray(variable);
                    default:
                        return variable !== null && !Array.isArray(variable);
                }
        }
}

export function type_check(variable, conf) {
    for (toCheck in conf) {
        switch (toCheck) {
            case "type":
                if (type_check_v1(variable, conf.type) === false) return false;
                break;
            case "value":
                if (JSON.stringify(variable) !== JSON.stringify(conf.value))
                    return false;
                break;
            case "enum":
                let found = false;
                for (subValue of conf.enum) {
                    found = type_check_v2(variable, { value: subValue });
                    if (found) break;
                }
                if (!found) return false;
                break;
            case "properties":
                for (prop in toCheck) {
                    switch (prop) {
                        case "type":
                            if (type_check_v1(variable, conf.type) === false) return false;
                            break;
                        case "value":
                            if (JSON.stringify(variable) !== JSON.stringify(conf.value))
                                return false;
                            break;
                        case "enum":
                            let found = false;
                            for (subValue of conf.enum) {
                                found = type_check_v2(variable, { value: subValue });
                                if (found) break;
                            }
                            if (!found) return false;
                            break;
                    }
                }
        }
    }
    return true;
}


export function capitalize(chaine) {
    if (typeof chaine !== "string" || chaine === "") return "";
    return chaine
      .split(" ")
      .map((word) => ucfirst(word.toLowerCase()))
      .join(" ");
  }
  
  export function camelCase(chaine) {
if (typeof chaine !== "string" || chaine === "") return "";
return capitalize(chaine).replace(/\W/g, "");
}