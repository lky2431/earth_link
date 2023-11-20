<script>
    import Heart from "svelte-material-icons/Heart.svelte";
    import Comment from "svelte-material-icons/Comment.svelte";
    import ShareOutline from "svelte-material-icons/ShareOutline.svelte";

    export let image;
    export let avatar;
    export let name;
    export let content;
</script>

<main class="post">
    <div class="iconlist">
        <img
            src="src/assets/avatar/{avatar}.jpg"
            width="20px"
            height="20px"
            style="border-radius: 50%;"
        />
        <p>{name}</p>
    </div>
    <p>{content}</p>
    <img
        src={image}
        alt="image"
        style="object-fit:cover"
        height="200px"
        width="240px"
    />
    <div class="iconlist">
        <Heart color="red" />
        <span/>
        <Comment color="black" />
        <span/>
        <ShareOutline color="black" />
    </div>
</main>

<style>
    p {
        color: #000;
        text-align: left;
        padding-left: 8px;
        font-size: 12px;
    }
    span{
        width: 12px;
    }
    .post {
        background-color: white;
        max-width: 240px;
        box-shadow: 0.4px 8px 0 rgba(0, 0, 0, 0, 2);
        border-radius: 5px;
        position: absolute;
        right: 6%;
        top: 10%;
    }
    .iconlist {
        padding: 8px 8px;
        display: flex;
        width: 100%;
        align-items: center;
        flex-direction: row;
        justify-content: flex-start;
    }
</style>
