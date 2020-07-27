import React from "react";
import { useForm } from "react-hook-form";

export default function SignupForm() {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (data) => {
        const {name, handle, bio, nodeUrl} = data;
        console.log(data);
        console.log(name, handle, bio, nodeUrl);
        // Call Init Alice on nodeURL
        // Call get_policy_pubkey
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="handle">Handle</label>
          <input
            name="handle"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <input
            name="bio"
            type="textbox"
            ref={register({  maxLength: 420 })}
          />
        </div>
        <div>
          <label htmlFor="nodeUrl">Node URL</label>
          <input
            name="nodeUrl"
            type="url"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
        <input type="submit" />
      </form>
    );
}