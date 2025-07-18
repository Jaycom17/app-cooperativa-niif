interface FormItemProps {
  name: string;
  to: string;
}

function FormItem({ name, to }: FormItemProps) {
  return (
    <a
      href={to}
      className="flex items-center hover:scale-105 hover:bg-slate-100 duration-150 justify-center w-full flex-col rounded-2xl p-2"
    >
      <img
        src="https://cdn.pixabay.com/photo/2016/03/31/14/48/sheet-1292828_1280.png"
        alt="RentaFija"
        className="h-10 rounded-t-lg"
      />
      <h3 className=" font-semibold text-center">{name}</h3>
    </a>
  );
}

export default FormItem;
