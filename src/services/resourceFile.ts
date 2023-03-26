export async function resourceFile(arg: File) {
  const result = new Promise<string>(function (res) {
    const fr = new FileReader();
    fr.onload = ({ target }) => {
      res(target?.result as string);
    };
    fr.readAsDataURL(arg);
  });
  return result;
}
