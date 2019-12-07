<template>
    <sidebar-menu :menu="menu" />
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
    data() {
        return {
            menu: [
                {
                    header: true,
                    title: 'Main Navigation',
                    hiddenOnCollapse: true
                },
                {
                    href: '/admin-requests',
                    title: 'Admin Requests',
                    icon: 'folder_open'
                }
            ] 
        }
    }
}
</script>