export async function resourceFile(arg: File) {
  const result = new Promise<string>(function (res) {
    const fr = new FileReader();
    fr.onload = ({ target }) => {
      res(target?.result as string);
    };
    arg && fr.readAsDataURL(arg);
  });
  return arg ? result : "";
}
