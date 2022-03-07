<script>
  import { onMount } from "svelte";

  const ENDPOINT = "http://localhost:3000/"; // If it won't work replace with http://IP_ADDRES:3000 like https://198.168.1.2:3000
  let users = [];
  let name = "";
  let surname = "";

  const addUser = async () => {
    let payload = { name, surname };
    const res = await fetch(ENDPOINT + "create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    console.log("🚀 ~ file: App.svelte ~ line 10 ~ addUser ~ json", json);
    // result = JSON.stringify(json);
    getUsers();
    name = "";
    surname = "";
  };

  const getUsers = async () => {
    console.log("clicked");
    const res = await fetch(ENDPOINT + "users", {
      method: "GET",
    });
    console.log("🚀 ~ file: App.svelte ~ line 17 ~ getUsers ~ res", res);

    const usersObj = await res.json();
    console.log("🚀 ~ file: App.svelte ~ line 19 ~ getUsers ~ json", usersObj);

    let tmpUsers = [];
    for (const key in usersObj) {
      if (Object.hasOwnProperty.call(usersObj, key)) {
        const user = usersObj[key];
        tmpUsers.push(user);
      }
    }

    users = [...tmpUsers];
    console.log("clicked 2");
  };

  const deleteUser = async (userId) => {
    const res = await fetch(ENDPOINT + "delete-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
      }),
    });

    const json = await res.json();
    JSON.stringify(json);
    console.log(
      "🚀 ~ file: App.svelte ~ line 46 ~ deleteUser ~ JSON.stringify(json)",
      JSON.stringify(json)
    );
    getUsers();
  };

  onMount(() => {
    getUsers();
  });
</script>

<main>
  <h1>MESN</h1>
  <input type="text" bind:value={name} placeholder="name" />
  <input type="text" bind:value={surname} placeholder="surname" />
  <button on:click={addUser}>Add User</button>
  <button on:click={getUsers}>Get Users</button>
  <hr />
  {#each users as user (user._id)}
    <p>id : {user._id}</p>
    <p>name : {user.name}</p>
    <p>surname : {user.surname}</p>
    <button on:click={() => deleteUser(user._id)}>Delete User</button>
    <hr />
  {:else}
    <p>There is no user, yet</p>
  {/each}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  input[type="text"]:focus {
    outline: none;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
