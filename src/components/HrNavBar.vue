<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a @click.prevent="this.$emit('select','users')" class="nav-link" href="#">Пользователи</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="this.$emit('select','profile_edit')" class="nav-link" href="#">Редактировать профиль</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="this.$emit('select','notifications')" class="nav-link" href="#">Уведомления</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'HrNavbar',
}
</script>

<style scoped>
.navbar,
.navbar-collapse {
    flex-direction: column;
    align-items: start;
}
.navbar-expand-lg .navbar-nav {
    flex-direction: column;
    align-items: start;
}
.navbar{
    width: 13%;
    height: 100vh;
    align-items: flex-start;
}

.nav-link{
    margin-left: 0.5rem;
}

a{
    color: white;
}
</style>