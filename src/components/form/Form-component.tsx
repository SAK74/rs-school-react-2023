import { useState, ChangeEventHandler } from "react";
import { Switch, Input } from "./";
import "./form-style.scss";
import { resourceFile } from "services/resourceFile";
import { FormValues } from "types";
import { CardsList } from "components";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";

const initialValues: Partial<FormValues> = {
  title: "",
  firstName: "",
  lastName: "",
  date: "",
  switch: "male",
  check: false,
  nat: "",
  mail: "",
};

const nat = ["UA", "US", "GE", "FR", "GB", "CA", "FI", "NO", "BR", "DE"];
const errText = "Fill this field!";

export const Forms = () => {
  const [cards, setCards] = useState<FormValues[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitted, errors, isSubmitSuccessful },
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: initialValues,
  });

  const confirmData = (data: FormValues) => {
    let isInit = true;
    return window.confirm(
      `Data to save: ${JSON.stringify(
        data,
        function (key, val) {
          if (isInit) {
            isInit = false;
            return val;
          }
          return key === "file" ? val.name : val;
        },
        2
      )}`
    );
  };

  const onValid: SubmitHandler<FormValues> = async (formData) => {
    const sourceFile = formData.file.content[0];
    formData.file = {
      name: sourceFile.name,
      image: await resourceFile(sourceFile),
      content: formData.file.content,
    };
    if (!confirmData(formData)) {
      return;
    }
    setCards((cards) => {
      const temp = [...cards];
      temp.push(formData);
      return [...temp];
    });
    reset();
  };

  const handleSwitch: ChangeEventHandler<HTMLInputElement> = ({
    target: { checked },
  }) => {
    setValue("switch", checked ? "female" : "male");
  };

  const { ref, ...switchRegister } = register("switch");

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className="form__form">
        <select {...register("title")} defaultValue="Ms.">
          <option value="Mr.">Mr</option>
          <option value="Ms.">Ms</option>
          <option value="Mss.">Mss</option>
        </select>

        <Input
          {...register("firstName", { required: errText })}
          placeholder="You first name"
          label="Your first name: "
          error={errors.firstName}
        />
        <Input
          {...register("lastName", { required: errText })}
          placeholder="You second name"
          label="Your last name: "
          error={errors.lastName}
        />
        <Switch
          label="Male"
          label2="Female"
          {...switchRegister}
          onChange={handleSwitch}
        />

        <Input
          type="date"
          {...register("date", {
            required: errText,
            validate: (val) =>
              new Date().getFullYear() - new Date(val).getFullYear() >= 16 ||
              "You must over 16",
          })}
          label="Date of birth: "
          error={errors.date}
        />
        <div>
          <select {...register("nat", { required: errText })}>
            <option value="">-Select nationality-</option>
            {nat.map((val, i) => (
              <option key={val + i} value={val}>
                {val}
              </option>
            ))}
          </select>
          {errors.nat && <span>{errors.nat.message}</span>}
        </div>
        <Input
          type="email"
          label="You e-mail"
          placeholder="Type You mail"
          {...register("mail", {
            required: errText,
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, //eslint-disable-line
              message: "Incorrect format",
            },
          })}
          error={errors.mail}
        />
        <Input
          type="file"
          accept="image/*"
          {...register("file.content", { required: "Choose a photo!" })}
          isSubmittedSuccessfull={isSubmitSuccessful}
          error={errors.file?.content}
          data-testid="file-field"
        />
        <Input
          type="checkbox"
          {...register("check", { required: "Confirm Your choise" })}
          label="Approve choose"
          error={errors.check}
        />
        <button
          type="submit"
          disabled={
            !isDirty || (isSubmitted && !isSubmitSuccessful && !isValid)
          }
        >
          Submit
        </button>
      </form>
      <CardsList
        cards={cards.map((card) => ({
          name: {
            first: card.firstName,
            last: card.lastName,
            title: card.title,
          },
          dob: {
            date: card.date,
            age: new Date().getFullYear() - new Date(card.date).getFullYear(),
          },
          nat: card.nat,
          picture: {
            medium: card.file.image,
          },
          email: card.mail,
          location: {
            city: "Lviv",
            country: "Ukraine",
          },
          login: {},
        }))}
      />
    </>
  );
};
