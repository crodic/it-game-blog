'use client';

import * as React from 'react';
import { Bot, Settings2, SquareTerminal } from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { NavLogo } from './nav-logo';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Chung',
            url: '#',
            icon: SquareTerminal,
            isActive: false,
            items: [
                {
                    title: 'Bảng Điều Khiển',
                    url: '/dashboard',
                },
                {
                    title: 'Báo Cáo',
                    url: '/dashboard/announcement',
                },
                {
                    title: 'Ý Kiến',
                    url: '/dashboard/feedback',
                },
            ],
        },
        {
            title: 'Quản Lý',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Bài Viết',
                    url: '/dashboard/blogs',
                },
                {
                    title: 'Danh Mục',
                    url: '/dashboard/categories',
                },
            ],
        },
        {
            title: 'Cài Đặt',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'Cài Đặt Chung',
                    url: '/dashboard/settings',
                },
                {
                    title: 'Cài Đặt Website',
                    url: '/dashboard/settings/website',
                },
                {
                    title: 'Quản Trị Viên',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavLogo />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
