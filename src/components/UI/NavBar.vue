<template>
    <div class="navbar">
        <div class="navbar-container">
            <p class="navbar__header">LAZY2TYPE</p>
            <a
                href="https://github.com/hendrywilliam/lazy2type"
                class="navbar__github-link"
            >
                <img src="../../assets/img/github.svg" alt="Github" />
                Star on Github
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding-left: 30px;
    padding-right: 30px;
    height: 70px;
}

@media only screen and (max-width: 1023px) {
    .navbar-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border: none;
        .navbar__header {
            font-weight: 600;
            font-size: 15px;
        }

        .navbar__github-link {
            color: #d3d3d3;
            display: flex;
            gap: 10px;
            text-decoration: none;
            border: 1px solid #d3d3d3;
            padding: 5px;
            border-radius: 0.5rem;
        }
    }
}

@media only screen and (min-width: 1024px) {
    .navbar-container {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;

        .navbar__header {
            font-weight: 600;
            font-size: 15px;
        }

        .navbar__github-link {
            color: #d3d3d3;
            display: flex;
            gap: 10px;
            text-decoration: none;
            border: 1px solid #d3d3d3;
            padding: 5px;
            border-radius: 0.5rem;
        }
    }
}
</style>
