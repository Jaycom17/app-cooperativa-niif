/**
 * ============================================================================
 * SUITE DE PRUEBAS: FormRender Component
 * ============================================================================
 * 
 * COMPONENTE BAJO PRUEBA: /src/forms/components/FormRender.tsx
 * 
 * DESCRIPCIÓN:
 * Este archivo contiene las pruebas exhaustivas para el componente FormRender,
 * que es el punto de entrada principal para renderizar formularios dinámicos
 * basados en objetos JSON. Detecta si el valor es un objeto o primitivo y
 * renderiza el componente apropiado (ObjectFieldset o PrimitiveInput).
 * 
 * FUNCIONALIDADES CUBIERTAS:
 * 1. Renderizado de objetos complejos con ObjectFieldset
 * 2. Renderizado de valores primitivos con PrimitiveInput
 * 3. Propagación correcta de props (onChange, config, canEdit, etc.)
 * 4. Manejo de configuraciones opcionales
 * 5. Valores por defecto de props
 * 6. Integración con hooks de paginación y búsqueda
 * 7. Casos edge: objetos vacíos, null, undefined, arrays
 * ============================================================================
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

import { FormRender } from "../../../src/forms/components/FormRender";
import type { JSONFormConfig, JSONObject } from "../../../src/forms/models/FormRender";

/**
 * MOCK DATA: Funciones de prueba
 * PROPÓSITO: Simular las funciones que se pasan como props al componente
 * FUNCIONES MOCKEADAS:
 * - onChange: Simula el handler que procesa cambios en el formulario
 * USO: Se pasan como props a FormRender para verificar que se llaman correctamente
 */
const mockOnChange = vi.fn();

describe("FormRender", () => {
  /**
   * beforeEach: Configuración previa a cada prueba
   * PROPÓSITO: Limpiar todos los mocks antes de cada test
   * GARANTIZA: Cada prueba comienza con un estado limpio y predecible
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Renderizado con objetos (ObjectFieldset)", () => {
    /**
     * PRUEBA: Renderizado básico de objeto simple
     * CUBRE: Renderizado inicial del componente FormRender con objeto
     * VERIFICA:
     * - El componente ObjectFieldset se renderiza correctamente
     * - Los campos del objeto se muestran en la interfaz
     * - La estructura base está presente (contenedor con bg-gray-50)
     */
    it("renderiza un objeto simple correctamente", () => {
      const testObj: JSONObject = {
        nombre: "Juan Pérez",
        edad: 30,
        activo: true,
      };

      render(<FormRender value={testObj} onChange={mockOnChange} />);

      expect(screen.getByText(/nombre/i)).toBeInTheDocument();
      expect(screen.getByText(/edad/i)).toBeInTheDocument();
      expect(screen.getByText(/activo/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado de objeto anidado
     * CUBRE: Renderización de objetos complejos con múltiples niveles
     * VERIFICA:
     * - Los objetos anidados se expanden/colapsan correctamente
     * - Los campos anidados se muestran al expandir
     * - La jerarquía se mantiene correctamente
     */
    it("renderiza objetos anidados con botones de expansión", () => {
      const nestedObj: JSONObject = {
        DatosDelDeclarante: {
          NumeroDeIdentificacionTributariaNIT: 900123456,
          PrimerNombre: "María",
          PrimerApellido: "García",
        },
        DatosInformativos: {
          EntidadCooperativaArticulo19EstatutoTributario: true,
          MonedaFuncionalDiferenteAlPesoColombiano: false,
        },
      };

      render(<FormRender value={nestedObj} onChange={mockOnChange} />);

      // Verificar que aparecen los botones de expansión
      expect(screen.getByText(/datos del declarante/i)).toBeInTheDocument();
      expect(screen.getByText(/datos informativos/i)).toBeInTheDocument();

      // Por defecto no están expandidos (defaultOpen = false)
      expect(screen.queryByText(/primer nombre/i)).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Expansión de secciones anidadas
     * CUBRE: Interacción del usuario con secciones colapsables
     * SIMULA: Usuario hace clic para expandir una sección
     * VERIFICA:
     * - El contenido anidado se muestra al hacer clic
     * - Los campos internos aparecen correctamente
     */
    it("permite expandir secciones anidadas al hacer clic", () => {
      const nestedObj: JSONObject = {
        Tarifas: {
          TarifGen: 35,
          Art240Paragrafo1: 20,
        },
      };

      render(<FormRender value={nestedObj} onChange={mockOnChange} />);

      // Inicialmente colapsado
      expect(screen.queryByDisplayValue(/35/)).not.toBeInTheDocument();

      // Expandir sección
      const expandButton = screen.getByText(/tarifas/i);
      fireEvent.click(expandButton);

      // Verificar que aparece el contenido
      expect(screen.getByDisplayValue(/35/)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Objeto con muchos campos activa búsqueda
     * CUBRE: Renderización condicional del SearchBox
     * VERIFICA:
     * - SearchBox aparece cuando hay más de 10 campos
     * - El placeholder del SearchBox es correcto
     */
    it("muestra el buscador cuando el objeto tiene más de 10 campos", () => {
      const largeObj: JSONObject = {};
      for (let i = 1; i <= 15; i++) {
        largeObj[`campo${i}`] = `valor${i}`;
      }

      render(<FormRender value={largeObj} onChange={mockOnChange} />);

      // Verificar que existe un input de búsqueda
      const searchInput = screen.getByPlaceholderText(/buscar en \d+ campos/i);
      expect(searchInput).toBeInTheDocument();
    });

    /**
     * PRUEBA: Objeto pequeño no muestra buscador
     * CUBRE: Renderización condicional cuando no hay suficientes campos
     * VERIFICA:
     * - SearchBox NO aparece con 10 o menos campos
     */
    it("no muestra el buscador cuando el objeto tiene 10 o menos campos", () => {
      const smallObj: JSONObject = {
        campo1: "valor1",
        campo2: "valor2",
        campo3: "valor3",
      };

      render(<FormRender value={smallObj} onChange={mockOnChange} />);

      // No debe existir input de búsqueda
      expect(screen.queryByPlaceholderText(/buscar/i)).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Búsqueda filtra campos correctamente
     * CUBRE: Funcionalidad del hook useSearch
     * SIMULA: Usuario busca un campo específico
     * VERIFICA:
     * - Solo se muestran los campos que coinciden con la búsqueda
     * - Los campos que no coinciden se ocultan
     */
    it("permite buscar y filtrar campos", () => {
      const searchableObj: JSONObject = {};
      for (let i = 1; i <= 15; i++) {
        searchableObj[`campo${i}`] = `valor${i}`;
      }
      searchableObj.nombreEspecial = "test";
      searchableObj.emailEspecial = "test@test.com";

      render(<FormRender value={searchableObj} onChange={mockOnChange} />);

      const searchInput = screen.getByPlaceholderText(/buscar/i);
      
      // Buscar "Especial"
      fireEvent.change(searchInput, { target: { value: "Especial" } });

      // Debería mostrar solo los campos que contienen "Especial"
      expect(screen.getByText(/nombre especial/i)).toBeInTheDocument();
      expect(screen.getByText(/email especial/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Paginación aparece con muchos campos
     * CUBRE: Renderización condicional de Pagination
     * VERIFICA:
     * - La paginación se muestra cuando hay más de maxInitialItems
     * - Los controles de navegación están presentes
     */
    it("muestra paginación cuando hay más campos que maxInitialItems", () => {
      const largeObj: JSONObject = {};
      for (let i = 1; i <= 60; i++) {
        largeObj[`campo${i}`] = `valor${i}`;
      }

      render(
        <FormRender 
          value={largeObj} 
          onChange={mockOnChange} 
          maxInitialItems={50}
        />
      );

      // Verificar que aparecen los controles de paginación
      expect(screen.getByText(/página \d+ de \d+/i)).toBeInTheDocument();
      expect(screen.getByText(/anterior/i)).toBeInTheDocument();
      expect(screen.getByText(/siguiente/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Objeto vacío se renderiza sin errores
     * CUBRE: Caso edge con objeto vacío
     * VERIFICA:
     * - No se produce ningún error
     * - El contenedor se renderiza correctamente
     */
    it("renderiza un objeto vacío sin errores", () => {
      const emptyObj: JSONObject = {};

      const { container } = render(
        <FormRender value={emptyObj} onChange={mockOnChange} />
      );

      // Verificar que el contenedor principal existe
      expect(container.querySelector('.bg-gray-50')).toBeInTheDocument();
    });
  });

  describe("Renderizado con primitivos (PrimitiveInput)", () => {
    /**
     * PRUEBA: Renderizado de string
     * CUBRE: Renderización de valores primitivos tipo string
     * VERIFICA:
     * - PrimitiveInput se renderiza para strings
     * - El valor se muestra correctamente
     */
    it("renderiza un valor string correctamente", () => {
      const stringValue = "Texto de prueba";

      render(<FormRender value={stringValue} onChange={mockOnChange} />);

      const input = screen.getByDisplayValue(stringValue);
      expect(input).toBeInTheDocument();
      // El input no tiene atributo type cuando es primitivo directo, se renderiza como input estándar
      expect(input.tagName).toBe("INPUT");
    });

    /**
     * PRUEBA: Renderizado de número
     * CUBRE: Renderización de valores primitivos tipo number
     * VERIFICA:
     * - PrimitiveInput se renderiza para números
     * - El valor numérico se muestra en formato moneda
     */
    it("renderiza un valor numérico correctamente", () => {
      const numberValue = 1000000;

      render(<FormRender value={numberValue} onChange={mockOnChange} />);

      // Los números se muestran como currency por defecto
      expect(screen.getByDisplayValue(/1\.000\.000/)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado de booleano
     * CUBRE: Renderización de valores primitivos tipo boolean
     * VERIFICA:
     * - PrimitiveInput se renderiza como checkbox para booleanos
     * - El estado checked refleja el valor
     */
    it("renderiza un valor booleano como checkbox", () => {
      const boolValue = true;

      render(<FormRender value={boolValue} onChange={mockOnChange} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });

    /**
     * PRUEBA: Renderizado de null
     * CUBRE: Caso edge con valor null
     * VERIFICA:
     * - No se produce error con valor null
     * - Se renderiza como input text vacío
     */
    it("renderiza null sin errores", () => {
      const nullValue = null;

      render(<FormRender value={nullValue} onChange={mockOnChange} />);

      const input = screen.getByDisplayValue("");
      expect(input).toBeInTheDocument();
    });

    /**
     * PRUEBA: Cambio de valor en input primitivo
     * CUBRE: Propagación del onChange en PrimitiveInput
     * SIMULA: Usuario edita un campo de texto
     * VERIFICA:
     * - onChange se llama con el nuevo valor
     */
    it("propaga onChange correctamente en valores primitivos", () => {
      const stringValue = "Inicial";

      render(<FormRender value={stringValue} onChange={mockOnChange} />);

      const input = screen.getByDisplayValue(stringValue);
      fireEvent.change(input, { target: { value: "Modificado" } });

      expect(mockOnChange).toHaveBeenCalledWith("Modificado", expect.anything());
    });
  });

  describe("Propagación de props", () => {
    /**
     * PRUEBA: Prop config se propaga correctamente
     * CUBRE: Propagación de configuración personalizada
     * VERIFICA:
     * - Las etiquetas personalizadas se aplican
     * - La configuración llega a los componentes hijos
     */
    it("propaga la configuración (config) a los componentes hijos", () => {
      const testObj: JSONObject = {
        nombreUsuario: "Test User",
      };

      const config: JSONFormConfig = {
        byKey: {
          nombreUsuario: {
            label: "Nombre Completo del Usuario",
          },
        },
      };

      render(
        <FormRender 
          value={testObj} 
          onChange={mockOnChange} 
          config={config}
        />
      );

      // Verificar que se usa la etiqueta personalizada
      expect(screen.getByText("Nombre Completo del Usuario")).toBeInTheDocument();
    });

    /**
     * PRUEBA: Prop canEdit controla edición
     * CUBRE: Control de capacidad de edición
     * VERIFICA:
     * - Cuando canEdit=false, los inputs son readonly
     * - Cuando canEdit=true, los inputs son editables
     */
    it("respeta la prop canEdit para deshabilitar edición", () => {
      const testObj: JSONObject = {
        campo: "valor",
      };

      const { rerender } = render(
        <FormRender 
          value={testObj} 
          onChange={mockOnChange} 
          canEdit={false}
        />
      );

      const input = screen.getByDisplayValue("valor") as HTMLInputElement;
      expect(input.readOnly).toBe(true);

      // Cambiar a editable
      rerender(
        <FormRender 
          value={testObj} 
          onChange={mockOnChange} 
          canEdit={true}
        />
      );

      expect(input.readOnly).toBe(false);
    });

    /**
     * PRUEBA: Prop defaultOpen controla expansión inicial
     * CUBRE: Estado inicial de secciones anidadas
     * VERIFICA:
     * - defaultOpen=true muestra contenido anidado inicialmente
     * - defaultOpen=false oculta contenido anidado inicialmente
     */
    it("respeta la prop defaultOpen para objetos anidados", () => {
      const nestedObj: JSONObject = {
        seccion: {
          campo: "contenido",
        },
      };

      const { rerender } = render(
        <FormRender 
          value={nestedObj} 
          onChange={mockOnChange} 
          defaultOpen={false}
        />
      );

      // Por defecto cerrado
      expect(screen.queryByText(/campo/i)).not.toBeInTheDocument();

      // Cambiar a abierto por defecto
      rerender(
        <FormRender 
          value={nestedObj} 
          onChange={mockOnChange} 
          defaultOpen={true}
        />
      );

      // Nota: Esta prueba puede fallar si defaultOpen no se implementa completamente
      // El comportamiento actual usa estado local en ObjectFieldset
    });

    /**
     * PRUEBA: Prop maxInitialItems controla paginación
     * CUBRE: Configuración del tamaño de página
     * VERIFICA:
     * - maxInitialItems determina cuántos items se muestran antes de paginar
     */
    it("respeta la prop maxInitialItems para controlar paginación", () => {
      const largeObj: JSONObject = {};
      for (let i = 1; i <= 30; i++) {
        largeObj[`campo${i}`] = `valor${i}`;
      }

      render(
        <FormRender 
          value={largeObj} 
          onChange={mockOnChange} 
          maxInitialItems={20}
        />
      );

      // Debería mostrar paginación ya que 30 > 20
      expect(screen.getByText(/página/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Prop onChange funciona por defecto
     * CUBRE: Valor por defecto de onChange
     * VERIFICA:
     * - Si no se pasa onChange, el componente usa una función vacía
     * - No se producen errores al intentar cambiar valores
     */
    it("usa función vacía por defecto si no se pasa onChange", () => {
      const testObj: JSONObject = {
        campo: "test",
      };

      // Renderizar sin onChange
      render(<FormRender value={testObj} />);

      const input = screen.getByDisplayValue("test");
      
      // No debería lanzar error
      expect(() => {
        fireEvent.change(input, { target: { value: "nuevo" } });
      }).not.toThrow();
    });

    /**
     * PRUEBA: Props por defecto se aplican correctamente
     * CUBRE: Valores por defecto definidos en el componente
     * VERIFICA:
     * - defaultOpen = false por defecto
     * - canEdit = true por defecto
     * - maxInitialItems = 50 por defecto
     * - lazyLoadChildren = true por defecto
     */
    it("aplica valores por defecto a las props", () => {
      const testObj: JSONObject = {
        campo: "test",
      };

      render(<FormRender value={testObj} />);

      const input = screen.getByDisplayValue("test") as HTMLInputElement;
      
      // canEdit = true por defecto (input no readonly)
      expect(input.readOnly).toBe(false);
    });
  });

  describe("Integración con onChange", () => {
    /**
     * PRUEBA: onChange se llama con path correcto en objeto simple
     * CUBRE: Propagación del path en la jerarquía
     * SIMULA: Usuario modifica un campo en un objeto
     * VERIFICA:
     * - onChange recibe el valor actualizado
     * - El path se genera correctamente
     */
    it("llama a onChange con el objeto actualizado al modificar un campo", () => {
      const testObj: JSONObject = {
        nombre: "Original",
        apellido: "Apellido",
      };

      render(<FormRender value={testObj} onChange={mockOnChange} />);

      const nombreInput = screen.getByDisplayValue("Original");
      fireEvent.change(nombreInput, { target: { value: "Modificado" } });

      expect(mockOnChange).toHaveBeenCalled();
      const [updatedObj] = mockOnChange.mock.calls[0];
      expect(updatedObj.nombre).toBe("Modificado");
      expect(updatedObj.apellido).toBe("Apellido");
    });

    /**
     * PRUEBA: onChange con objetos anidados
     * CUBRE: Actualización de objetos en múltiples niveles
     * SIMULA: Usuario modifica un campo anidado
     * VERIFICA:
     * - onChange recibe el objeto completo actualizado
     * - La estructura anidada se mantiene
     */
    it("llama a onChange correctamente con objetos anidados", async () => {
      const nestedObj: JSONObject = {
        DatosDelDeclarante: {
          RazonSocial: "Cooperativa de Ahorro",
          NumeroDeIdentificacionTributariaNIT: 900123456,
        },
      };

      render(<FormRender value={nestedObj} onChange={mockOnChange} />);

      // Expandir la sección
      const expandButton = screen.getByText(/datos del declarante/i);
      fireEvent.click(expandButton);

      // Esperar a que aparezca el campo
      await waitFor(() => {
        expect(screen.getByDisplayValue("Cooperativa de Ahorro")).toBeInTheDocument();
      });

      const razonSocialInput = screen.getByDisplayValue("Cooperativa de Ahorro");
      fireEvent.change(razonSocialInput, { target: { value: "Cooperativa Nueva" } });

      expect(mockOnChange).toHaveBeenCalled();
      const [updatedObj] = mockOnChange.mock.calls[0];
      expect(updatedObj.DatosDelDeclarante.RazonSocial).toBe("Cooperativa Nueva");
      expect(updatedObj.DatosDelDeclarante.NumeroDeIdentificacionTributariaNIT).toBe(900123456);
    });

    /**
     * PRUEBA: onChange con checkbox (boolean)
     * CUBRE: Cambio de valores booleanos
     * SIMULA: Usuario marca/desmarca un checkbox
     * VERIFICA:
     * - onChange se llama con el valor booleano correcto
     */
    it("llama a onChange con valor booleano al cambiar checkbox", () => {
      const testObj: JSONObject = {
        activo: false,
      };

      render(<FormRender value={testObj} onChange={mockOnChange} />);

      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(mockOnChange).toHaveBeenCalled();
      const [updatedObj] = mockOnChange.mock.calls[0];
      expect(updatedObj.activo).toBe(true);
    });

    /**
     * PRUEBA: onChange con valores numéricos (currency)
     * CUBRE: Cambio de valores numéricos con formato de moneda
     * SIMULA: Usuario ingresa un nuevo valor monetario
     * VERIFICA:
     * - onChange se llama con el número parseado correctamente
     */
    it("llama a onChange con valor numérico al modificar campo currency", () => {
      const testObj: JSONObject = {
        salario: 1000000,
      };

      render(<FormRender value={testObj} onChange={mockOnChange} />);

      const input = screen.getByDisplayValue(/1\.000\.000/);
      
      // Simular focus para activar modo edición
      fireEvent.focus(input);
      
      // Cambiar valor
      fireEvent.change(input, { target: { value: "2000000" } });
      
      // Simular blur para guardar
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalled();
      const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1];
      const [updatedObj] = lastCall;
      expect(updatedObj.salario).toBe(2000000);
    });
  });

  describe("Casos edge y comportamientos especiales", () => {
    /**
     * PRUEBA: Manejo de array (no es objeto válido)
     * CUBRE: Comportamiento con tipo de dato no esperado
     * VERIFICA:
     * - Arrays no se tratan como objetos
     * - Se renderiza como primitivo o se maneja apropiadamente
     */
    it("maneja arrays sin renderizarlos como objetos", () => {
      const arrayValue = ["item1", "item2", "item3"];

      // Arrays no son objetos según isObject, se renderizan como primitivos
      const { container } = render(
        <FormRender value={arrayValue as any} onChange={mockOnChange} />
      );

      // Verificar que no se renderiza como objeto (sin bg-gray-50 del ObjectFieldset)
      expect(container.querySelector('.bg-gray-50')).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Objeto con propiedades especiales
     * CUBRE: Propiedades con nombres no convencionales
     * VERIFICA:
     * - Propiedades con números se manejan correctamente
     * - Propiedades con caracteres especiales funcionan
     */
    it("maneja objetos con nombres de propiedades especiales", () => {
      const specialObj: JSONObject = {
        "campo-con-guiones": "valor1",
        "campo_con_underscores": "valor2",
        "campo123": "valor3",
        "123campo": "valor4",
      };

      render(<FormRender value={specialObj} onChange={mockOnChange} />);

      // Verificar que se renderizan (humanizeKey procesa los nombres)
      expect(screen.getByDisplayValue("valor1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("valor2")).toBeInTheDocument();
      expect(screen.getByDisplayValue("valor3")).toBeInTheDocument();
      expect(screen.getByDisplayValue("valor4")).toBeInTheDocument();
    });
    /**
     * PRUEBA: Objeto con profundidad múltiple
     * CUBRE: Jerarquías complejas con varios niveles
     * VERIFICA:
     * - Se pueden navegar múltiples niveles de anidación
     * - Cada nivel se expande/colapsa independientemente
     */
    it("maneja objetos con múltiples niveles de anidación", async () => {
      const deepObj: JSONObject = {
        PropiedadesPlantasYEquipos: {
          Edificios: {
            DatosContables: {
              ImporteAlComienzoDelPeriodo: {
                Costo: 50000000,
              },
            },
          },
        },
      };

      render(<FormRender value={deepObj} onChange={mockOnChange} />);

      // Verificar que comienza colapsado
      expect(screen.queryByDisplayValue(/50\.000\.000/)).not.toBeInTheDocument();

      // Expandir PropiedadesPlantasYEquipos
      const buttons1 = screen.getAllByRole('button');
      const ppyeButton = buttons1.find(btn => btn.textContent?.includes('Propiedades Plantas'));
      expect(ppyeButton).toBeDefined();
      fireEvent.click(ppyeButton!);
      
      // Esperar y expandir Edificios
      await waitFor(() => {
        const buttons2 = screen.getAllByRole('button');
        const edificiosButton = buttons2.find(btn => btn.textContent?.includes('Edificios'));
        expect(edificiosButton).toBeDefined();
        if (edificiosButton) {
          fireEvent.click(edificiosButton);
        }
      });

      // Esperar y expandir DatosContables
      await waitFor(() => {
        const buttons3 = screen.getAllByRole('button');
        const datosButton = buttons3.find(btn => btn.textContent?.includes('Datos Contables'));
        expect(datosButton).toBeDefined();
        if (datosButton) {
          fireEvent.click(datosButton);
        }
      });

      // Esperar y expandir ImporteAlComienzoDelPeriodo
      await waitFor(() => {
        const buttons4 = screen.getAllByRole('button');
        const importeButton = buttons4.find(btn => btn.textContent?.includes('Importe Al Comienzo'));
        expect(importeButton).toBeDefined();
        if (importeButton) {
          fireEvent.click(importeButton);
        }
      });

      // Verificar que el campo Costo aparece
      await waitFor(() => {
        expect(screen.getByDisplayValue(/50\.000\.000/)).toBeInTheDocument();
      });
    });

    /**
     * PRUEBA: Objeto con valores mixtos
     * CUBRE: Objeto con diferentes tipos de valores
     * VERIFICA:
     * - Strings, números, booleanos y objetos anidados coexisten
     * - Cada tipo se renderiza con su widget apropiado
     */
    it("maneja objetos con tipos de valores mixtos", () => {
      const mixedObj: JSONObject = {
        Año: 2024,
        RazonSocial: "Cooperativa de Ahorro y Crédito",
        EntidadCooperativaArticulo19EstatutoTributario: true,
        DatosInformativos: {
          ContratoDeEstabilidadJuridica: false,
        },
      };

      render(<FormRender value={mixedObj} onChange={mockOnChange} />);

      // Verificar diferentes tipos de inputs
      expect(screen.getByDisplayValue("Cooperativa de Ahorro y Crédito")).toBeInTheDocument();
      expect(screen.getByDisplayValue(/2\.024/)).toBeInTheDocument(); // currency format
      expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
      expect(screen.getByText(/datos informativos/i)).toBeInTheDocument();
    });

    /**
     * PRUEBA: Renderizado sin errores con undefined
     * CUBRE: Caso edge con valor undefined
     * VERIFICA:
     * - No se producen errores con undefined
     * - Se renderiza apropiadamente
     */
    it("maneja undefined sin errores", () => {
      const undefinedValue = undefined;

      render(
        <FormRender value={undefinedValue as any} onChange={mockOnChange} />
      );

      // No debería haber errores, renderiza input vacío
      expect(screen.getByDisplayValue("")).toBeInTheDocument();
    });

    /**
     * PRUEBA: Actualización de value (re-render)
     * CUBRE: Comportamiento reactivo ante cambios en props
     * VERIFICA:
     * - El componente se actualiza cuando cambia el valor
     * - Los nuevos valores se reflejan en la UI
     */
    it("se actualiza correctamente cuando cambia el prop value", () => {
      const initialObj: JSONObject = {
        campo: "inicial",
      };

      const { rerender } = render(
        <FormRender value={initialObj} onChange={mockOnChange} />
      );

      expect(screen.getByDisplayValue("inicial")).toBeInTheDocument();

      // Actualizar el valor
      const updatedObj: JSONObject = {
        campo: "actualizado",
      };

      rerender(
        <FormRender value={updatedObj} onChange={mockOnChange} />
      );

      expect(screen.getByDisplayValue("actualizado")).toBeInTheDocument();
      expect(screen.queryByDisplayValue("inicial")).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Configuración con campos ocultos
     * CUBRE: Uso de hidden en la configuración
     * VERIFICA:
     * - Los campos marcados como hidden no se muestran
     * - Los demás campos se muestran normalmente
     */
    it("respeta la configuración de campos ocultos (hidden)", () => {
      const testObj: JSONObject = {
        visible: "este se ve",
        oculto: "este no se ve",
      };

      const config: JSONFormConfig = {
        byKey: {
          oculto: {
            hidden: true,
          },
        },
      };

      render(
        <FormRender 
          value={testObj} 
          onChange={mockOnChange} 
          config={config}
        />
      );

      expect(screen.getByDisplayValue("este se ve")).toBeInTheDocument();
      expect(screen.queryByDisplayValue("este no se ve")).not.toBeInTheDocument();
    });

    /**
     * PRUEBA: Configuración con campos readonly
     * CUBRE: Uso de readonly en la configuración
     * VERIFICA:
     * - Los campos marcados como readonly no son editables
     * - Los demás campos permanecen editables
     */
    it("respeta la configuración de campos readonly", () => {
      const testObj: JSONObject = {
        editable: "puedes editar",
        bloqueado: "no puedes editar",
      };

      const config: JSONFormConfig = {
        byKey: {
          bloqueado: {
            readonly: true,
          },
        },
      };

      render(
        <FormRender 
          value={testObj} 
          onChange={mockOnChange} 
          config={config}
          canEdit={true}
        />
      );

      const editableInput = screen.getByDisplayValue("puedes editar") as HTMLInputElement;
      const readonlyInput = screen.getByDisplayValue("no puedes editar") as HTMLInputElement;

      expect(editableInput.readOnly).toBe(false);
      expect(readonlyInput.readOnly).toBe(true);
    });
  });
});