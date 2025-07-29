import jsonData from "../models/DetalleReglones.json";
import StudentLayout from "../../components/templates/StudentLayout";
import FormTabs from "../components/FormTabs";
import { useState, useEffect, useRef } from "react";
import {
  TabsNames,
  CalculatedValues,
  ValuesNames,
  RSumNorm,
  RSumFisc,
  RSumVal,
  addRetencion,
} from "../utils/DetalleReng";
import { DetalleReglonesService } from "../services/detalleReglones.service";

const DetalleRenglones = () => {
  const [data, setData] = useState(jsonData);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateValue = (value, path) => {
    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (path)
    let currentLevel = updatedData;
    const pathArray = path.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Actualizar el valor
    currentLevel[lastKey] = value;
    setData(updatedData);
  };

  const updateArray = (length, path) => {
    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (path)
    let currentLevel = updatedData;
    const pathArray = path.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Actualizar el valor
    console.log("length", currentLevel[lastKey].length);
    for (let i = 0; i < length; i++) {
      if (currentLevel[lastKey].length < length) {
        currentLevel[lastKey].push({
          ...addRetencion,
        });
      }
    }
    setData(updatedData);
  };

  const recieveData = (key, path) => {
    if (Array.isArray(key) && key.length > 1) {
      updateArray(key.length, path);
    }
    if (typeof key === "object") {
      Object.entries(key).map(([key, val]) => {
        recieveData(val, `${path}.${key}`);
      });
    } else {
      updateValue(key, path);
    }
  };

  useEffect(() => {
    DetalleReglonesService.getDetalleReglonesFormStudent()
      .then((response) => {
        if (response.status === 200) {
          Object.entries(response.data.detContent).map(([key, val]) => {
            recieveData(val, [key]);
          });
        } else {
          console.error("Error en la respuesta", response);
        }
      })
      .catch((error) => {
        console.error("Error en la llamada a la API", error);
      });
  }, []);

  function redondear(numero, digitos) {
    const factor = Math.pow(10, -digitos);
    return Math.round(numero / factor) * factor;
  }

  const calculateSaldFisc = (currentData) => {
    for (let key in currentData) {
      if (currentData[key] && typeof currentData[key] === "object") {
        currentData[key] = calculateSaldFisc(currentData[key]);
      }
    }
    if ("SaldFisc" in currentData) {
      currentData.SaldFisc =
        (currentData.SaldCont || currentData.REFSaldCont || 0) +
        (currentData.Ajust1 || 0) -
        (currentData.Ajust3 || 0);
      if (currentData.SaldFisc < 0) currentData.SaldFisc = 0;
    }
    return currentData;
  };

  const calculateTotCont = (currentData) => {
    let result = 0;
    if (typeof currentData === "object") {
      for (let key in currentData) {
        if (typeof currentData[key] === "object") {
          if ("SaldCont" in currentData[key]) {
            result += currentData[key].SaldCont;
          } else if ("REFSaldCont" in currentData[key]) {
            result += currentData[key].REFSaldCont;
          } else {
            result += calculateTotCont(currentData[key]);
          }
        }
      }
    }
    return result;
  };

  const calculateTotFisc = (currentData) => {
    let result = 0;
    if (typeof currentData === "object") {
      for (let key in currentData) {
        if (typeof currentData[key] === "object") {
          if ("SaldFisc" in currentData[key]) {
            result += currentData[key].SaldFisc;
          } else if ("REFSaldFisc" in currentData[key]) {
            result += currentData[key].REFSaldFisc;
          } else {
            result += calculateTotFisc(currentData[key]);
          }
        }
      }
    }
    return result;
  };

  const calculateTotContR104 = (currentData) => {
    let result = 0;
    if (typeof currentData === "object") {
      for (let key in currentData) {
        if (typeof currentData[key] === "object") {
          if ("TotCont" in currentData[key]) {
            result += currentData[key].TotCont;
          } else {
            result += calculateTotContR104(currentData[key]);
          }
        }
      }
    }
    return result;
  };

  const calculateTotFiscR104 = (currentData) => {
    let result = 0;
    if (typeof currentData === "object") {
      for (let key in currentData) {
        if (typeof currentData[key] === "object") {
          if ("TotFisc" in currentData[key]) {
            result += currentData[key].TotFisc;
          } else {
            result += calculateTotFiscR104(currentData[key]);
          }
        }
      }
    }
    return result;
  };

  const calculateTotFiscVal = (currentData) => {
    let result = 0;
    for (let key in currentData) {
      if (key !== "TotFisc" && typeof currentData[key] !== "object") {
        result += currentData[key];
      }
    }
    return result;
  };

  const calculateRSum = (currentData, RDest, RSum) => {
    let resultTotCont = 0;
    let resultTotFisc = 0;
    for (let key of RSum) {
      resultTotCont +=
        currentData[key].TotCont ||
        currentData[key].ValCont ||
        currentData[key].REFTotCont ||
        0;
      resultTotFisc +=
        currentData[key].TotFisc ||
        currentData[key].ValFisc ||
        currentData[key].REFTotFisc ||
        0;
    }
    currentData[RDest].TotCont = resultTotCont;
    currentData[RDest].TotFisc = resultTotFisc;
    return currentData[RDest];
  };

  const calculateRSumFisc = (currentData, RDest, RSum) => {
    let resultTotFisc = 0;
    for (let key of RSum) {
      resultTotFisc +=
        currentData[key].TotFisc ||
        currentData[key].ValFisc ||
        currentData[key].REFTotFisc ||
        0;
    }
    currentData[RDest].TotFisc = resultTotFisc;
    return currentData[RDest];
  };

  const calculateR85 = (currentData) => {
    const L853 = currentData.R80.TotFisc || 0;
    const L860 = currentData.R81.TotFisc || 0;
    const L863 = currentData.R82.TotFisc || 0;
    const L866 = currentData.R83.TotFisc || 0;
    const L870 = currentData.R84.TotFisc || 0;
    let cond1 = 0;
    let cond2 = 0;
    let result = 0;
    //Esc1
    result = L853 - L866 - L870;
    if (L860 === 0 && result > 0) {
      currentData.R85.Esc1 = result;
    } else {
      currentData.R85.Esc1 = 0;
    }
    //Esc2
    result = L853 + L860 - L866 - L870;
    if (L860 > 0 && L863 === 0 && result > 0) {
      currentData.R85.Esc2 = result;
    } else {
      currentData.R85.Esc2 = 0;
    }
    //Esc3
    cond1 = L853 - L866 - L870;
    cond2 = L860 - L863;
    result = L853 - L866 - L870 + L860 - L863;
    if (cond1 > 0 && cond2 > 0) {
      currentData.R85.Esc3 = result;
    } else {
      currentData.R85.Esc3 = 0;
    }
    //Esc4
    cond1 = L853 - L866;
    cond2 = L853 - L866 + L860;
    result = L853 - L866 + L860;
    if (cond1 < 0 && L863 === 0 && cond2 > 0) {
      currentData.R85.Esc4 = result;
    } else {
      currentData.R85.Esc4 = 0;
    }
    //TotFisc
    const Vals = [
      currentData.R85.Esc1 || 0,
      currentData.R85.Esc2 || 0,
      currentData.R85.Esc3 || 0,
      currentData.R85.Esc4 || 0,
    ];
    currentData.R85.TotFisc = redondear(Math.max(...Vals), -3);
    return currentData.R85;
  };

  const calculateRestNoNeg = (val1, val2) => {
    let result = val1 - val2;
    if (result < 0) {
      return 0;
    } else {
      return result;
    }
  };

  const calculateRSumRes = (currentData, RDest, RSum, RRes) => {
    let TotCont = 0;
    let TotFisc = 0;
    for (let key of RSum) {
      TotCont +=
        currentData[key].TotCont ||
        currentData[key].ValCont ||
        currentData[key].REFTotCont ||
        0;
      TotFisc +=
        currentData[key].TotFisc ||
        currentData[key].ValFisc ||
        currentData[key].REFTotFisc ||
        0;
    }
    for (let key of RRes) {
      TotCont -=
        currentData[key].TotCont ||
        currentData[key].ValCont ||
        currentData[key].REFTotCont ||
        0;
      TotFisc -=
        currentData[key].TotFisc ||
        currentData[key].ValFisc ||
        currentData[key].REFTotFisc ||
        0;
    }
    if (TotCont < 0) {
      TotCont = 0;
    }
    if (TotFisc < 0) {
      TotFisc = 0;
    }
    currentData[RDest].TotCont = TotCont;
    currentData[RDest].TotFisc = TotFisc;
    return currentData[RDest];
  };

  const calculate3130 = (currentData) => {
    let result = 0;
    result =
      (currentData.TotCont || 0) -
      ((currentData[3605]["UtilDesImp"].SaldCont || 0) +
        (currentData[3605]["PerDesImp"].SaldCont || 0) +
        (currentData[3705].SaldCont || 0) +
        (currentData[3710].SaldCont || 0) +
        (currentData[3715]["GananAcum"].SaldCont || 0) +
        (currentData[3715]["PerAcum"].SaldCont || 0) +
        (currentData[3720]["GananAcumORI"].SaldCont || 0) +
        (currentData[3720]["PerAcumORI"].SaldCont || 0) +
        (currentData[3805]["Reval"].SaldCont || 0) +
        (currentData[3805]["MetPar"].SaldCont || 0));
    return result;
  };

  const calculateR74Valfin = (currentData) => {
    let result =
      (currentData.R74.CompenExcRen.Sub || 0) +
      (currentData.R74.CompenPerFisc.Val || 0);
    if (result > currentData.R72.TotFisc) {
      result = currentData.R72.TotFisc;
    }
    return result;
  };

  const calculateR79TotFisc = (currentData) => {
    let result = 0;
    if ((currentData["R75"].TotFisc || 0) > (currentData["R76"].ValFisc || 0)) {
      result =
        (currentData["R75"].TotFisc || 0) -
        ((currentData["R77"].TotFisc || 0) + (currentData["R78"].TotFisc || 0));
    } else {
      result =
        (currentData["R76"].ValFisc || 0) -
        ((currentData["R77"].TotFisc || 0) + (currentData["R78"].TotFisc || 0));
    }
    return result;
  };

  const calculateR93 = (currentData) => {
    currentData.R93.DescDonEnt.ValApli =
      (currentData.R93.DescDonEnt.Donac || 0) *
      ((currentData.R93.DescDonEnt.PorcApli || 0) / 100);
    currentData.R93.DescDonEnt.Limit = redondear(
      (currentData.R92.TotFisc || 0) * 0.25,
      -3
    );
    if (
      (currentData.R93.DescDonEnt.ValApli || 0) <
      (currentData.R93.DescDonEnt.Limit || 0)
    ) {
      currentData.R93.DescDonEnt.Desc = currentData.R93.DescDonEnt.ValApli || 0;
    } else {
      currentData.R93.DescDonEnt.Desc = currentData.R93.DescDonEnt.Limit || 0;
    }
    const result =
      (currentData.R93.DescDonEnt.Desc || 0) +
      (currentData.R93.Otro.IndCom || 0) +
      (currentData.R93.Otro.IVA || 0) +
      (currentData.R93.Otro.RetTran || 0) +
      (currentData.R93.Otro.Otro || 0);
    if (result > (currentData.R92.TotFisc || 0)) {
      currentData.R93.TotFisc = currentData.R92.TotFisc || 0;
    } else {
      currentData.R93.TotFisc = result;
    }
    return currentData.R93;
  };

  const calculateR95 = (currentData) => {
    currentData.R95.LotRif =
      (currentData["R80"][429543]["PreRifLot"].SaldFisc || 0) * 0.2;
    if (
      (currentData.R85.TotFisc || 0) -
        (currentData["R80"][429543]["PreRifLot"].SaldFisc || 0) >
      0
    ) {
      currentData.R95.OtroGanOca =
        redondear(
          (currentData.R85.TotFisc || 0) -
            (currentData["R80"][429543]["PreRifLot"].SaldFisc || 0),
          -3
        ) * 0.1;
    } else {
      currentData.R95.OtroGanOca = 0;
    }
    currentData.R95.TotFisc =
      (currentData.R95.LotRif || 0) + (currentData.R95.OtroGanOca || 0);
    return currentData.R95;
  };

  const handleAdd = (path) => {
    const pathArray = path.split(".");
    let newData = { ...data };
    if (pathArray[pathArray.length - 2] === "Ventas") {
      newData.R104.Ventas.Data.push({
        ...addRetencion,
      });
    } else if (pathArray[pathArray.length - 2] === "Servicio") {
      newData.R104.Servicio.Data.push({
        ...addRetencion,
      });
    } else if (pathArray[pathArray.length - 2] === "HonorCom") {
      newData.R104.HonorCom.Data.push({
        ...addRetencion,
      });
    } else if (pathArray[pathArray.length - 2] === "RenFin") {
      newData.R104.RenFin.Data.push({
        ...addRetencion,
      });
    } else if (pathArray[pathArray.length - 2] === "DiviPart") {
      newData.R104.DiviPart.Data.push({
        ...addRetencion,
      });
    } else if (pathArray[pathArray.length - 2] === "Otro") {
      newData.R104.Otro.Data.push({
        ...addRetencion,
      });
    }
    setData(newData);
  };

  const handleQuit = (path) => {
    const pathArray = path.split(".");
    let newData = { ...data };
    if (pathArray[pathArray.length - 2] === "Ventas") {
      if (newData.R104.Ventas.Data.length !== 1) newData.R104.Ventas.Data.pop();
    } else if (pathArray[pathArray.length - 2] === "Servicio") {
      if (newData.R104.Servicio.Data.length !== 1)
        newData.R104.Servicio.Data.pop();
    } else if (pathArray[pathArray.length - 2] === "HonorCom") {
      if (newData.R104.HonorCom.Data.length !== 1)
        newData.R104.HonorCom.Data.pop();
    } else if (pathArray[pathArray.length - 2] === "RenFin") {
      if (newData.R104.RenFin.Data.length !== 1) newData.R104.RenFin.Data.pop();
    } else if (pathArray[pathArray.length - 2] === "DiviPart") {
      if (newData.R104.DiviPart.Data.length !== 1)
        newData.R104.DiviPart.Data.pop();
    } else if (pathArray[pathArray.length - 2] === "Otro") {
      if (newData.R104.Otro.Data.length !== 1) newData.R104.Otro.Data.pop();
    }
    setData(newData);
  };

  const handleChange = (e) => {
    let { name, value, type } = e.target;

    if (value === "") value = 0;

    // Crear una copia del objeto data
    const updatedData = { ...data };

    // Navegar al valor específico usando la ruta (name)
    let currentLevel = updatedData;
    const pathArray = name.split(".");
    for (let i = 0; i < pathArray.length - 1; i++) {
      currentLevel = currentLevel[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];

    // Detectar el tipo de dato actual
    const currentValueType = typeof currentLevel[lastKey];
    // Convertir el valor al tipo correcto
    if (type !== "text") {
      if (currentValueType === "number") {
        value = parseFloat(value);
      } else if (currentValueType === "boolean") {
        value = value === "true";
      }
    } else if (type === "text" && value === 0) {
      value = "";
    }

    // No es necesario convertir si es una cadena de texto (string)

    // Actualizar el valor
    currentLevel[lastKey] = value;
    //for (let key in updatedData) {
    let key = pathArray[0];
    if (RSumNorm.includes(key)) {
      for (let subKey in updatedData[key]) {
        if (typeof updatedData[key][subKey] === "object") {
          updatedData[key][subKey] = calculateSaldFisc(
            updatedData[key][subKey]
          );
        }
      }
      let TotCont = calculateTotCont(updatedData[key]);
      let TotFisc = calculateTotFisc(updatedData[key]);
      if (TotCont < 0) {
        updatedData[key].TotCont = 0;
      } else {
        updatedData[key].TotCont = TotCont;
      }
      if (TotFisc < 0) {
        updatedData[key].TotFisc = 0;
      } else {
        updatedData[key].TotFisc = TotFisc;
      }
    } else if (RSumFisc.includes(key)) {
      for (let subKey in updatedData[key]) {
        if (typeof updatedData[key][subKey] === "object") {
          updatedData[key][subKey] = calculateSaldFisc(
            updatedData[key][subKey]
          );
        }
      }
      let TotFisc = calculateTotFisc(updatedData[key]);
      if (TotFisc < 0) {
        updatedData[key].TotFisc = 0;
      } else {
        updatedData[key].TotFisc = TotFisc;
      }
    } else if (RSumVal.includes(key)) {
      updatedData[key].TotFisc = calculateTotFiscVal(updatedData[key]);
    } else if (key == "R104") {
      for (let subKey in updatedData[key]) {
        if (typeof updatedData[key][subKey] === "object") {
          updatedData[key][subKey]["Data"] = calculateSaldFisc(
            updatedData[key][subKey]["Data"]
          );
          let TotCont = calculateTotCont(updatedData[key][subKey]);
          let TotFisc = calculateTotFisc(updatedData[key][subKey]);
          if (TotCont < 0) {
            updatedData[key][subKey].TotCont = 0;
          } else {
            updatedData[key][subKey].TotCont = TotCont;
          }
          if (TotFisc < 0) {
            updatedData[key][subKey].TotFisc = 0;
          } else {
            updatedData[key][subKey].TotFisc = TotFisc;
          }
        }
      }
      let TotCont = calculateTotContR104(updatedData[key]);
      let TotFisc = calculateTotFiscR104(updatedData[key]);
      if (TotCont < 0) {
        updatedData[key].TotCont = 0;
      } else {
        updatedData[key].TotCont = TotCont;
      }
      if (TotFisc < 0) {
        updatedData[key].TotFisc = 0;
      } else {
        updatedData[key].TotFisc = TotFisc;
      }
    }
    updatedData.R44 = calculateRSum(updatedData, "R44", [
      "R36",
      "R37",
      "R38",
      "R39",
      "R40",
      "R41",
      "R42",
      "R43",
    ]);

    updatedData.R46.TotCont = calculateRestNoNeg(
      updatedData.R44.TotCont || 0,
      updatedData.R45.TotCont || 0
    );
    updatedData.R46.TotFisc = calculateRestNoNeg(
      updatedData.R44.TotFisc || 0,
      updatedData.R45.TotFisc || 0
    );
    updatedData["R46"][3130].SaldCont = calculate3130(updatedData.R46);

    updatedData["R51"]["Dat"].SaldFisc = calculateRestNoNeg(
      (updatedData["R51"]["Dat"].SaldCont || 0) +
        (updatedData["R51"]["Dat"].Ajust1 || 0),
      updatedData["R51"]["Dat"].Ajust3 || 0
    );

    updatedData.R58 = calculateRSum(updatedData, "R58", [
      "R47",
      "R48",
      "R49",
      "R50",
      "R51",
      "R52",
      "R53",
      "R54",
      "R55",
      "R56",
      "R57",
    ]);
    updatedData.R61 = calculateRSum(updatedData, "R61", ["R58", "R59", "R60"]);
    updatedData.R67 = calculateRSum(updatedData, "R67", [
      "R62",
      "R63",
      "R64",
      "R65",
      "R66",
    ]);

    updatedData.R72 = calculateRSumRes(
      updatedData,
      "R72",
      ["R61", "R69", "R70", "R71"],
      ["R52", "R53", "R54", "R55", "R56", "R67", "R68"]
    );
    updatedData.R73 = calculateRSumRes(
      updatedData,
      "R73",
      ["R52", "R53", "R54", "R55", "R56", "R67", "R68"],
      ["R61", "R69", "R70", "R71"]
    );
    updatedData.R74.CompenExcRen.Sub = updatedData.R74.CompenExcRen.Exc;
    updatedData.R74.CompenExcRen.ValFin = calculateR74Valfin(updatedData);
    updatedData.R74.TotFisc = updatedData.R74.CompenExcRen.ValFin;
    updatedData.R75.TotFisc = calculateRestNoNeg(
      updatedData.R72.TotFisc || 0,
      updatedData.R74.TotFisc || 0
    );

    updatedData.R79.TotFisc = calculateR79TotFisc(updatedData);

    updatedData.R85 = calculateR85(updatedData);

    updatedData.R86.TotFisc = redondear(
      (updatedData.R79.TotFisc || 0) * 0.35,
      -3
    );

    updatedData.R87.TotFisc = redondear(
      (updatedData.R54.TotFisc || 0) * 0.1,
      -3
    );

    updatedData.R89.TotFisc = redondear(
      (updatedData.R56.TotFisc || 0) * 0.27,
      -3
    );

    updatedData.R90.TotFisc = redondear(
      (updatedData.R53.TotFisc || 0) * 0.31 +
        (updatedData.R53.TotFisc || 0) * 0.69 * 0.1,
      -3
    );

    updatedData.R91.TotFisc = redondear(
      (updatedData.R52.TotFisc || 0) * 0.33,
      -3
    );

    updatedData.R92 = calculateRSumFisc(updatedData, "R92", [
      "R86",
      "R87",
      "R88",
      "R89",
      "R90",
      "R91",
    ]);

    updatedData.R93 = calculateR93(updatedData);

    updatedData.R94.TotFisc = calculateRestNoNeg(
      updatedData.R92.TotFisc || 0,
      updatedData.R93.TotFisc || 0
    );

    updatedData.R95 = calculateR95(updatedData);

    updatedData.R97.TotFisc =
      (updatedData.R94.TotFisc || 0) +
      (updatedData.R95.TotFisc || 0) -
      (updatedData.R96.ValFisc || 0);

    updatedData.R105.TotFisc =
      (updatedData.R103.ValFisc || 0) + (updatedData.R104.TotFisc || 0);

    updatedData.R110.TotFisc = calculateRestNoNeg(
      (updatedData.R97.TotFisc || 0) +
        (updatedData.R106.ValFisc || 0) +
        (updatedData.R108.ValFisc || 0) +
        (updatedData.R109.ValFisc || 0),
      (updatedData.R98.ValFisc || 0) +
        (updatedData.R99.ValFisc || 0) +
        (updatedData.R100.ValFisc || 0) +
        (updatedData.R101.ValFisc || 0) +
        (updatedData.R102.ValFisc || 0) +
        (updatedData.R105.TotFisc || 0) +
        (updatedData.R107.ValFisc || 0)
    );

    updatedData.R111.TotFisc = updatedData.R111.Extem;

    updatedData.R112.TotFisc = calculateRestNoNeg(
      (updatedData.R97.TotFisc || 0) +
        (updatedData.R106.ValFisc || 0) +
        (updatedData.R108.ValFisc || 0) +
        (updatedData.R109.ValFisc || 0) +
        (updatedData.R111.TotFisc || 0),
      (updatedData.R98.ValFisc || 0) +
        (updatedData.R99.ValFisc || 0) +
        (updatedData.R100.ValFisc || 0) +
        (updatedData.R101.ValFisc || 0) +
        (updatedData.R102.ValFisc || 0) +
        (updatedData.R105.TotFisc || 0) +
        (updatedData.R107.ValFisc || 0)
    );

    updatedData.R113.TotFisc = calculateRestNoNeg(
      (updatedData.R98.ValFisc || 0) +
        (updatedData.R99.ValFisc || 0) +
        (updatedData.R100.ValFisc || 0) +
        (updatedData.R101.ValFisc || 0) +
        (updatedData.R102.ValFisc || 0) +
        (updatedData.R105.TotFisc || 0) +
        (updatedData.R107.ValFisc || 0),
      (updatedData.R97.TotFisc || 0) +
        (updatedData.R106.ValFisc || 0) +
        (updatedData.R108.ValFisc || 0) +
        (updatedData.R109.ValFisc || 0) +
        (updatedData.R111.TotFisc || 0)
    );

    //}

    /*
        // Actualizar el estado con el objeto modificado
        Object.entries(updatedData).map(([key,val]) => {
            if (RSumNorm.includes(key)) {
                Object.entries(val).map(([subKey,subVal]) => {
                    if (typeof subVal === 'object') {
                        updatedData[key][subKey].SaldFisc = calculateSaldFisc(updatedData[key][subKey]);
                    }
                })
                updatedData[key].TotCont = calculateTotCont(updatedData[key]);
                updatedData[key].TotFisc = calculateTotFisc(updatedData[key]);
            } else if (RSumFisc.includes(key)) {
                Object.entries(val).map(([subKey,subVal]) => {
                    if (typeof subVal === 'object') {
                        if(updatedData[key][subKey].SaldFisc !== null){
                            updatedData[key][subKey].SaldFisc = calculateSaldFisc(updatedData[key][subKey]);
                        }
                    }
                })
                updatedData[key].TotFisc = calculateTotFisc(updatedData[key]);
            }
        })*/
    // Calculo de los totales
    setData(updatedData);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      DetalleReglonesService.updateADetalleReglonesFormStudent(updatedData);
      timeoutRef.current = null;
    }, 5000);
  };

  return (
    <StudentLayout>
      <FormTabs
        json={data}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleQuit={handleQuit}
        TabsNames={TabsNames}
        CalculatedValues={CalculatedValues}
        ValuesNames={ValuesNames}
      />
    </StudentLayout>
  );
};
export default DetalleRenglones;
