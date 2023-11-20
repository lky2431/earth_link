<script>
    import Heart from "svelte-material-icons/Heart.svelte";
    import Home from "svelte-material-icons/Home.svelte";
    import Search from "svelte-material-icons/SearchWeb.svelte";
    import Compass from "svelte-material-icons/Compass.svelte";
    import Plus from "svelte-material-icons/PlusBox.svelte";
    export let goHome;
    
    import {getContext} from 'svelte';

    let addMode = getContext("addMode");
    export let toggleaddMode;

</script>

<main class="sidebar">
    <h1>EarthLink</h1>
    <div on:click={goHome}>
        <Home color="white" size="36" />
    </div>

    <span />



    <div on:click={toggleaddMode}>
        <Plus color="white" size="36" />
    </div>
</main>

<style>
    div {
        display: flex;
    }
    span {
        height: 24px;
    }

    h1 {
        color: #ffffff;
        text-align: left;
        font-size: 24px;
        font-weight: 800;
        padding-bottom: 24px;
    }
    .sidebar {
        display: flex;
        flex-direction: column;
        max-width: 200px;
        box-shadow: 0.4px 8px 0 rgba(0, 0, 0, 0, 2);
        border-radius: 5px;
        position: absolute;
        left: 2%;
        top: 2%;
        column-gap: 30px;
    }
</style>
