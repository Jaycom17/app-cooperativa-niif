const calculateTotals = (
  arrayPath,
  data,
  totalLabel,
  regex = /./
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

  console.log('globalElement:', globalElement);
  console.log('totalLabel:', totalLabel);
  console.log('has totalLabel?', Object.prototype.hasOwnProperty.call(globalElement, totalLabel));

  if (!globalElement || !Object.prototype.hasOwnProperty.call(globalElement, totalLabel)) {
    console.log('Returning early: no globalElement or totalLabel');
    return;
  }

  if (!globalElement) {
    return;
  }

  const total = globalElement[totalLabel];
  console.log('total:', total);

  if (!total) {
    console.log('Returning early: no total');
    return;
  }

  const totalCopy = { ...total };
  console.log('totalCopy before reset:', totalCopy);

  const resetValues = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        resetValues(obj[key]);
      } else if (typeof obj[key] === "number") {
        obj[key] = 0;
      }
    });
  };

  resetValues(totalCopy);
  console.log('totalCopy after reset:', totalCopy);

  const addToTotal = (sourceObj, targetObj, add) => {
    console.log('addToTotal called with:', { sourceObj, targetObj, add });
    Object.keys(sourceObj).forEach((key) => {
      if (typeof sourceObj[key] === "object" && sourceObj[key] !== null) {
        if (typeof targetObj[key] === "object" && targetObj[key] !== null) {
          addToTotal(sourceObj[key], targetObj[key], add);
        } else if (targetObj[key] === undefined) {
          addToTotal(sourceObj[key], targetObj, add);
        }
      } else if (typeof sourceObj[key] === "number") {
        console.log(`Processing number: key=${key}, sourceObj[${key}]=${sourceObj[key]}, targetObj[${key}]=${targetObj[key]}, add=${add}`);
        if (add) {
          targetObj[key] += sourceObj[key] || 0;
        } else {
          targetObj[key] -= sourceObj[key] || 0;
        }
        console.log(`After: targetObj[${key}]=${targetObj[key]}`);
      }
    });
  };

  Object.keys(globalElement).forEach((key) => {
    console.log(`Checking key: ${key}, is totalLabel? ${key === totalLabel}`);
    if (key !== totalLabel) {
      const item = globalElement[key];
      console.log(`Item for key ${key}:`, item);
      if (typeof item === "object" && item !== null) {
        console.log(`Calling addToTotal for key ${key}, regex test: ${regex.test(key)}, add: ${!regex.test(key)}`);
        addToTotal(item, totalCopy, !regex.test(key));
      }
    }
  });

  console.log('Final totalCopy:', totalCopy);
  globalElement[totalLabel] = totalCopy;
};

// Test con path de longitud 2
const data1 = {
  Nivel1: {
    Renglon1: {
      Item1: { valor: 100 },
      Item2: { valor: 200 },
      Total: { valor: 0 },
    },
  },
};

console.log('===== Test 1: path con 2 elementos =====');
calculateTotals(['Nivel1', 'Renglon1'], data1, 'Total', /^$/);
console.log('Result:', data1.Nivel1.Renglon1.Total.valor);
console.log('Expected: 300');

// Test cuando data mismo tiene Item1, Item2, Total
const data2 = {
  Item1: { valor: 100 },
  Item2: { valor: 200 },
  Total: { valor: 0 },
};

console.log('\n===== Test 2: cuando globalElement === data (path longitud 1) =====');
calculateTotals(['root'], data2, 'Total', /^$/);
console.log('Result:', data2.Total.valor);
console.log('Expected: 300');
