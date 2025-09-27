export const calculateTotals = (
  arrayPath: string[],
    data: any,
    totalLabel: string,
    regex: RegExp = /./
  ) => {
    let currentPath = [...arrayPath];
    let globalElement = null;

    if (currentPath.length === 1) {
      globalElement = data;
    } else {
      while (currentPath.length > 0) {
        globalElement = currentPath.reduce((acc, key) => acc?.[key], data);

        if (globalElement && Object.prototype.hasOwnProperty.call(globalElement, totalLabel)) {
          break;
        }

        currentPath = currentPath.slice(0, -1);
      }
    }

    if (!globalElement || !Object.prototype.hasOwnProperty.call(globalElement, totalLabel)) {
      return;
    }

    if (!globalElement) {
      return;
    }

    const total = globalElement[totalLabel];

    if (!total) {
      return;
    }

    const totalCopy = { ...total };

    const resetValues = (obj: any): void => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          resetValues(obj[key]);
        } else if (typeof obj[key] === "number") {
          obj[key] = 0;
        }
      });
    };

    resetValues(totalCopy);

    const addToTotal = (sourceObj: any, targetObj: any, add: boolean): void => {
      Object.keys(sourceObj).forEach((key) => {
        if (typeof sourceObj[key] === "object" && sourceObj[key] !== null) {
          if (typeof targetObj[key] === "object" && targetObj[key] !== null) {
            addToTotal(sourceObj[key], targetObj[key], add);
          } else if (targetObj[key] === undefined) {
            addToTotal(sourceObj[key], targetObj, add);
          }
        } else if (typeof sourceObj[key] === "number") {
          if (add) {
            targetObj[key] += sourceObj[key] || 0;
          } else {
            targetObj[key] -= sourceObj[key] || 0;
          } 
        }
      });
    };

    Object.keys(globalElement).forEach((key) => {
      if (key !== totalLabel) {
        const item = globalElement[key];
        if (typeof item === "object" && item !== null) {
          addToTotal(item, totalCopy, !regex.test(key));
        }
      }
    });

    globalElement[totalLabel] = totalCopy;
  };

export const calculateTotalsSources = (
  data: any,
  sources: any[],
  totalLabel: string
) => {
  if (!data || !Array.isArray(sources) || sources.length === 0) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(data, totalLabel)) {
    return;
  }

  const totalCopy = { ...data[totalLabel] };

  const resetValues = (obj: any): void => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        resetValues(obj[key]);
      } else if (typeof obj[key] === "number") {
        obj[key] = 0;
      }
    });
  };

  resetValues(totalCopy);

  const addToTotal = (sourceObj: any, targetObj: any): void => {
    Object.keys(sourceObj).forEach((key) => {
      if (typeof sourceObj[key] === "object" && sourceObj[key] !== null) {
        if (typeof targetObj[key] === "object" && targetObj[key] !== null) {
          addToTotal(sourceObj[key], targetObj[key]);
        }
      } else if (typeof sourceObj[key] === "number") {
        targetObj[key] += sourceObj[key] || 0;
      }
    });
  };

  sources.forEach((source) => {
    if (source && typeof source === "object") {
      addToTotal(source, totalCopy);
    }
  });

  data[totalLabel] = totalCopy;
};
