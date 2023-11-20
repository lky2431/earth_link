<script>
    import { onDestroy, onMount } from "svelte";
    import * as Cesium from "cesium";

    export let setpickPositionable;
    export let addPost;
    export let cachedPost;
    export let toggleaddMode;

    var src = "src/assets/img/placeholder.jpg";

    let value = "";

    const STAGE = {
        FILE: "file",
        DESCRIPTION: "description",
        LOCATION: "location",
    };

    let stage = STAGE.FILE;

    onMount(() => {
        const reader = new FileReader();
        const fileInput = document.getElementById("image_upload");
        fileInput.addEventListener("change", (e) => {
            const f = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const dataURL = reader.result;
                src = dataURL;
            };
            reader.readAsDataURL(f);
        });
    });

    function selectFile() {
        document.getElementById("image_upload").click();
    }

    function next() {
        if (stage == STAGE.FILE) {
            stage = STAGE.DESCRIPTION;
        } else if (stage == STAGE.DESCRIPTION) {
            stage = STAGE.LOCATION;
            setpickPositionable(true);
        } else {
            const id = cachedPost.id;
            const position = cachedPost.position;
            const pos = Cesium.Cartographic.fromCartesian(position);
            let post = {
                id: id,
                image: src,
                avatar: "mike",
                name: "mikelam2431",
                content: value,
                longitude: pos.longitude,
                latitude:pos.latitude,
                height: pos.height,
                viewAngle: new Cesium.HeadingPitchRange(
                    Math.PI,
                    -Math.PI / 8,
                    100
                ),
            };
            addPost(post);
            toggleaddMode();
        }
    }

    onDestroy(() => {
        setpickPositionable(false);
    });
</script>

<div id="imageadder">
    {#if stage == STAGE.FILE}
        <img
            {src}
            alt=""
            style="object-fit:cover"
            height="200px"
            width="240px"
        />
        <div>
            <label for="files" class="btn" on:click={selectFile}
                >Select Image</label
            >
            <input
                type="file"
                accept="image/*"
                id="image_upload"
                style="display:none"
            />
        </div>
        {#if src != "src/assets/img/placeholder.jpg"}
            <button on:click={next}>Next</button>
        {/if}
    {:else if stage == STAGE.DESCRIPTION}
        <textarea bind:value placeholder="enter your story" />
        <button on:click={next}>Next</button>
    {:else}
        <h3 style="color: black;">Pick a position to Share</h3>
        {#if cachedPost != undefined}
            <button on:click={next}>OK</button>
        {/if}
    {/if}
</div>

<style>
    textarea {
        height: 200px;
        width: 100%;
    }
    .btn {
        color: #890b0b;
    }
    input {
        padding-top: 12px;
    }
    #imageadder {
        background-color: white;
        position: absolute;
        left: 0;
        right: 0;
        align-items: center;
        width: 240px;
        height: 280px;
        margin-left: auto;
        margin-right: auto;
        padding: 18px;
        border-radius: 24px;
        bottom: 3%;
        display: flex;
        flex-direction: column;
    }
    button {
        margin-top: 12px;
    }
</style>
