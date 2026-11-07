import React, { useState, useEffect, useRef } from 'react';
import { 
  Hash, 
  X,
  Users,
  ChevronDown,
  ChevronRight,
  Volume2,
  Lock,
  ArrowLeft,
  Mail,
  Search
} from 'lucide-react';

// --- DATA ---
const USERS = {
  jin: { name: "Seokjin", avatar: "/seokjin.png", status: "online", color: "text-pink-400" },
  joon: { name: "Namjoon", avatar: "/namjoon.png", status: "online", color: "text-blue-400" },
  hobi: { name: "Hoseok", avatar: "/hoseok.png", status: "online", color: "text-green-400" },
  jimin: { name: "Jimin", avatar: "/jimin.png", status: "online", color: "text-yellow-400" },
  tae: { name: "Taehyung", avatar: "/taehyung.png", status: "online", color: "text-purple-400" },
  jk: { name: "Jungkook", avatar: "/jungkook.png", status: "online", color: "text-red-400" },
  yoongi: { name: "Yoongi", avatar: "/yoongi.png", status: "offline", color: "text-gray-400" }
};

// General Channel Data - Historical Banter + The Panic
const GENERAL_DATA = [
  { id: 'g1', user: USERS.tae, time: "Aug 16, 2024, 02:14 PM", text: "did you know wombats poop cubes" },
  { id: 'g2', user: USERS.jk, time: "Aug 16, 2024, 02:15 PM", text: "what" },
  { id: 'g3', user: USERS.tae, time: "Aug 16, 2024, 02:15 PM", text: "cubes", reactions: [{emoji: "🧊", count: 3}, {emoji: "💩", count: 2}] },
  { id: 'g4', user: USERS.hobi, time: "Aug 16, 2024, 02:18 PM", text: "why do you know this" },
  { id: 'g5', user: USERS.tae, time: "Aug 16, 2024, 02:19 PM", text: "why DON'T you know this" },
  { id: 'g6', user: USERS.joon, time: "Aug 16, 2024, 02:25 PM", text: "Actually, it's because of differences in the elasticity of their intestinal walls.", reactions: [{emoji: "🤓", count: 4}] },
  { id: 'g7', user: USERS.jimin, time: "Aug 16, 2024, 02:26 PM", text: "namjoon hyung please" },
  { id: 'g8', user: USERS.jin, time: "Aug 16, 2024, 02:40 PM", text: "I leave you people alone for TWENTY MINUTES" },
  { id: 'g9', user: USERS.jk, time: "Aug 16, 2024, 02:41 PM", text: "hyung did you know wombats poop cubes" },
  { id: 'g10', user: USERS.jin, time: "Aug 16, 2024, 02:42 PM", text: "I wish I didn't" },
  { id: 'g11', user: USERS.tae, time: "Aug 16, 2024, 02:45 PM", text: "they use them to mark their territory btw" },
  { id: 'g12', user: USERS.hobi, time: "Aug 16, 2024, 02:46 PM", text: "so they're building property lines" },
  { id: 'g13', user: USERS.jimin, time: "Aug 16, 2024, 02:46 PM", text: "real estate agents of the animal kingdom!" },
  { id: 'g14', user: USERS.joon, time: "Aug 16, 2024, 02:48 PM", text: "That's not technically…" },
  { id: 'g15', user: USERS.jimin, time: "Aug 16, 2024, 02:48 PM", text: "let us have this" },
  { id: 'g16', user: USERS.jk, time: "Aug 16, 2024, 02:50 PM", text: "imagine getting evicted by a wombat", reactions: [{emoji: "💀", count: 5}] },
  { id: 'g17', user: USERS.jin, time: "Aug 16, 2024, 02:55 PM", text: "imagine paying rent" },
  { id: 'g18', user: USERS.hobi, time: "Aug 16, 2024, 02:56 PM", text: "hyung??" },
  { id: 'g19', user: USERS.jin, time: "Aug 16, 2024, 02:57 PM", text: "what. in this economy?\nYoongi will agree with me", reactions: [{emoji: "💯", count: 2}] },
  
  { id: 'g19a', user: USERS.yoongi, time: "Aug 16, 2024, 03:01 PM", text: "leave me out of this. i'm working." },
  { id: 'g19b', user: USERS.jimin, time: "Aug 16, 2024, 03:02 PM", text: "you told me you were going to bed an hour ago 😠", reactions: [{emoji: "👀", count: 2}] },
  { id: 'g19c', user: USERS.yoongi, time: "Aug 16, 2024, 03:04 PM", text: "got distracted." },
  
  { id: 'g20', user: USERS.tae, time: "Aug 16, 2024, 03:10 PM", text: "new business idea\nwombat-shaped ice cubes" },
  { id: 'g21', user: USERS.jimin, time: "Aug 16, 2024, 03:11 PM", text: "Absolutely NOT" },
  { id: 'g22', user: USERS.jk, time: "Aug 16, 2024, 03:12 PM", text: "i'd buy those", reactions: [{emoji: "💵", count: 1}] },
  { id: 'g23', user: USERS.jimin, time: "Aug 16, 2024, 03:12 PM", text: "eewwww" },
  { id: 'g24', user: USERS.joon, time: "Aug 16, 2024, 03:15 PM", text: "Please don't make them edible.", reactions: [{emoji: "🤢", count: 3}] },
  { id: 'g25', user: USERS.hobi, time: "Aug 16, 2024, 03:16 PM", text: "WHY WOULD YOU SAY THAT" },
  
  { id: 'g26', user: USERS.jin, time: "Feb 12, 2025, 05:30 PM", text: "i'm making a reservation at a restaurant without any of you" },
  { id: 'g27', user: USERS.jimin, time: "Feb 12, 2025, 05:32 PM", text: "save me a seat" },
  { id: 'g28', user: USERS.tae, time: "Feb 12, 2025, 05:33 PM", text: "save me a wombat", reactions: [{emoji: "😭", count: 4}] },
  { id: 'g29', user: USERS.jk, time: "Feb 12, 2025, 05:35 PM", text: "can we play games or are we starting a zoo" },
  { id: 'g30', user: USERS.hobi, time: "Feb 12, 2025, 05:36 PM", text: "both" },
  { id: 'g31', user: USERS.jin, time: "Feb 12, 2025, 05:45 PM", text: "if one more person asks me what's for dinner i'm eating the menu" },
  { id: 'g32', user: USERS.jimin, time: "Feb 12, 2025, 05:46 PM", text: "what's for dinner" },
  { id: 'g33', user: USERS.jin, time: "Feb 12, 2025, 05:47 PM", text: "you.", reactions: [{emoji: "🍴", count: 3}, {emoji: "😳", count: 2}] },
  { id: 'g34', user: USERS.jimin, time: "Feb 12, 2025, 05:48 PM", text: "i knew you loved me" },

  { id: 'g35', user: USERS.hobi, time: "Jun 22, 2026, 01:14 AM", text: "i just got home" },
  { id: 'g36', user: USERS.tae, time: "Jun 22, 2026, 01:15 AM", text: "welcome back" },
  { id: 'g37', user: USERS.hobi, time: "Jun 22, 2026, 01:16 AM", text: "i have to wake up in five hours", reactions: [{emoji: "🥱", count: 2}] },
  { id: 'g38', user: USERS.joon, time: "Jun 22, 2026, 01:20 AM", text: "Why are you still online?" },
  { id: 'g39', user: USERS.hobi, time: "Jun 22, 2026, 01:22 AM", text: "because my body is tired but my brain has decided it's the perfect time to remember every embarrassing thing i've done since 2009" },
  { id: 'g40', user: USERS.jk, time: "Jun 22, 2026, 01:23 AM", text: "real", reactions: [{emoji: "🎯", count: 3}] },
  
  { id: 'g40a', user: USERS.yoongi, time: "Jun 22, 2026, 01:25 AM", text: "go to sleep hoseok." },
  { id: 'g40b', user: USERS.jimin, time: "Jun 22, 2026, 01:26 AM", text: "hypocrite." },
  { id: 'g40c', user: USERS.yoongi, time: "Jun 22, 2026, 01:27 AM", text: "i'm almost done exporting." },
  { id: 'g40d', user: USERS.jimin, time: "Jun 22, 2026, 01:28 AM", text: "hurry up then.", reactions: [{emoji: "🏃💨", count: 1}] },

  { id: 'g41', user: USERS.jin, time: "Jun 22, 2026, 01:30 AM", text: "i once waved back at someone waving at the person behind me" },
  { id: 'g42', user: USERS.jimin, time: "Jun 22, 2026, 01:32 AM", text: "that's nothing\ni said you too when a waiter told me to enjoy my meal", reactions: [{emoji: "💀", count: 4}] },
  { id: 'g43', user: USERS.joon, time: "Jun 22, 2026, 01:35 AM", text: "That's a common response." },
  { id: 'g44', user: USERS.tae, time: "Jun 22, 2026, 01:40 AM", text: "i bowed to an automatic door once", reactions: [{emoji: "🤣", count: 6}] },
  { id: 'g45', user: USERS.hobi, time: "Jun 22, 2026, 01:42 AM", text: "why did that make me feel better" },
  { id: 'g46', user: USERS.jin, time: "Jun 22, 2026, 01:45 AM", text: "because we're all idiots", reactions: [{emoji: "❤️", count: 5}] },
  { id: 'g47', user: USERS.hobi, time: "Jun 22, 2026, 01:46 AM", text: "comforting. thank you." },
  { id: 'g48', user: USERS.jimin, time: "Jun 22, 2026, 01:50 AM", text: "get some sleep hyung" },
  { id: 'g49', user: USERS.hobi, time: "Jun 22, 2026, 01:52 AM", text: "after i check my bank account" },
  { id: 'g50', user: USERS.jin, time: "Jun 22, 2026, 01:55 AM", text: "don't. preserve the mystery.", reactions: [{emoji: "✨", count: 3}, {emoji: "💸", count: 2}] },

  { id: 'g51', user: USERS.jk, time: "Jun 28, 2026, 03:15 PM", text: "important question" },
  { id: 'g52', user: USERS.hobi, time: "Jun 28, 2026, 03:16 PM", text: "if this is about protein again" },
  { id: 'g53', user: USERS.jk, time: "Jun 28, 2026, 03:16 PM", text: "would you rather fight one horse-sized duck or a hundred duck-sized horses", reactions: [{emoji: "🦆", count: 4}, {emoji: "🐎", count: 2}] },
  { id: 'g54', user: USERS.jin, time: "Jun 28, 2026, 03:20 PM", text: "i'm too old for this", reactions: [{emoji: "👴", count: 3}] },
  { id: 'g55', user: USERS.yoongi, time: "Jun 28, 2026, 03:30 PM", text: "Same" },
  { id: 'g56', user: USERS.jimin, time: "Jun 28, 2026, 03:32 PM", text: "hey old man, can you bring food when you stop by later?", reactions: [{emoji: "🍲", count: 1}, {emoji: "👀", count: 2}] },
  { id: 'g57', user: USERS.yoongi, time: "Jun 28, 2026, 03:35 PM", text: "yeah. what do you want?" },
  { id: 'g58', user: USERS.tae, time: "Jun 28, 2026, 03:36 PM", text: "the duck" },
  { id: 'g59', user: USERS.yoongi, time: "Jun 28, 2026, 03:38 PM", text: "you ordering jimin's food now?" },
  { id: 'g60', user: USERS.jimin, time: "Jun 28, 2026, 03:39 PM", text: "you pick hyung" },
  { id: 'g61', user: USERS.tae, time: "Jun 28, 2026, 03:40 PM", text: "no the horse sized duck" },
  { id: 'g62', user: USERS.jin, time: "Jun 28, 2026, 03:45 PM", text: "still ordering for jimin perhaps", reactions: [{emoji: "🤭", count: 3}] },
  { id: 'g63', user: USERS.joon, time: "Jun 28, 2026, 03:50 PM", text: "A horse-sized duck would be significantly more dangerous than people assume.", reactions: [{emoji: "🤓", count: 4}] },
  { id: 'g64', user: USERS.jimin, time: "Jun 28, 2026, 03:52 PM", text: "why are we fighting animals" },
  { id: 'g65', user: USERS.jk, time: "Jun 28, 2026, 03:53 PM", text: "hypothetically" },
  { id: 'g66', user: USERS.hobi, time: "Jun 28, 2026, 03:55 PM", text: "why i'm expected to fight a duck" },
  { id: 'g67', user: USERS.tae, time: "Jun 28, 2026, 03:58 PM", text: "the duck is a messenger from the stars", reactions: [{emoji: "👽", count: 3}, {emoji: "✨", count: 2}] },
  { id: 'g68', user: USERS.joon, time: "Jun 28, 2026, 04:00 PM", text: "It is a hypothetical waterfowl." },
  { id: 'g69', user: USERS.jimin, time: "Jun 28, 2026, 04:02 PM", text: "i'm on the duck's side" },
  { id: 'g70', user: USERS.jk, time: "Jun 28, 2026, 04:03 PM", text: "traitor" },
  { id: 'g71', user: USERS.jimin, time: "Jun 28, 2026, 04:04 PM", text: "it has a family!" },
  { id: 'g72', user: USERS.jin, time: "Jun 28, 2026, 04:10 PM", text: "so do i and nobody's helping me with the dishes", reactions: [{emoji: "🍽️", count: 3}] },
  { id: 'g73', user: USERS.hobi, time: "Jun 28, 2026, 04:15 PM", text: "goodnight everyone" },
  { id: 'g74', user: USERS.tae, time: "Jun 28, 2026, 04:16 PM", text: "goodnight, duck warrior", reactions: [{emoji: "⚔️", count: 2}] },
  { id: 'g75', user: USERS.joon, time: "Jun 28, 2026, 04:20 PM", text: "Please don't encourage him." },

  { id: 'g76', user: USERS.tae, time: "Jul 14, 2026, 08:15 PM", text: "what if deja vu is just the universe buffering", reactions: [{emoji: "🤯", count: 5}, {emoji: "🔄", count: 3}] },
  { id: 'g77', user: USERS.joon, time: "Jul 14, 2026, 08:18 PM", text: "It's a cognitive phenomenon. Not evidence of a simulation." },
  { id: 'g78', user: USERS.jimin, time: "Jul 14, 2026, 08:20 PM", text: "you answered that frighteningly fast hyung" },
  { id: 'g79', user: USERS.joon, time: "Jul 14, 2026, 08:22 PM", text: "Because he asks this every week.", reactions: [{emoji: "🤦‍♂️", count: 6}] },
  { id: 'g80', user: USERS.tae, time: "Jul 14, 2026, 08:25 PM", text: "but what if" },
  { id: 'g81', user: USERS.joon, time: "Jul 14, 2026, 08:26 PM", text: "Still no." },
  { id: 'g82', user: USERS.jk, time: "Jul 14, 2026, 08:30 PM", text: "what if the universe is a group project" },
  { id: 'g83', user: USERS.jin, time: "Jul 14, 2026, 08:35 PM", text: "then i want to speak to whoever assigned the roles" },
  { id: 'g84', user: USERS.hobi, time: "Jul 14, 2026, 08:36 PM", text: "i'm doing everyone's part again aren't i", reactions: [{emoji: "😭", count: 4}] },
  { id: 'g85', user: USERS.jimin, time: "Jul 14, 2026, 08:38 PM", text: "you're the only one who reads the manual" },
  { id: 'g86', user: USERS.tae, time: "Jul 14, 2026, 08:40 PM", text: "i'm in charge of vibes" },
  { id: 'g87', user: USERS.joon, time: "Jul 14, 2026, 08:42 PM", text: "That is not a role." },
  { id: 'g88', user: USERS.tae, time: "Jul 14, 2026, 08:43 PM", text: "and yet the vibes are immaculate", reactions: [{emoji: "💅", count: 5}, {emoji: "✨", count: 4}] },
  { id: 'g89', user: USERS.jk, time: "Jul 14, 2026, 08:45 PM", text: "i can do the video presentation!" },
  { id: 'g90', user: USERS.jin, time: "Jul 14, 2026, 08:50 PM", text: "I'll just stand there and look pretty", reactions: [{emoji: "👑", count: 4}] },
  { id: 'g91', user: USERS.jk, time: "Jul 14, 2026, 08:52 PM", text: "so the presentation???" },
  { id: 'g92', user: USERS.jk, time: "Jul 14, 2026, 08:53 PM", text: "hello???" },
  { id: 'g93', user: USERS.jk, time: "Jul 14, 2026, 08:55 PM", text: "Okay I dont think I am making sense anymore HAHAHAHA" },

  { id: 'g94', user: USERS.jk, time: "Jul 28, 2026, 11:30 PM", text: "anyone wanna play" },
  { id: 'g95', user: USERS.hobi, time: "Jul 28, 2026, 11:35 PM", text: "what game" },
  { id: 'g96', user: USERS.jk, time: "Jul 28, 2026, 11:36 PM", text: "anything", reactions: [{emoji: "🎮", count: 2}] },
  { id: 'g97', user: USERS.jimin, time: "Jul 28, 2026, 11:40 PM", text: "that sounds ominous" },
  { id: 'g98', user: USERS.jk, time: "Jul 28, 2026, 11:41 PM", text: "i'm a man of many interests" },
  { id: 'g99', user: USERS.jin, time: "Jul 28, 2026, 11:45 PM", text: "name three" },
  { id: 'g100', user: USERS.jk, time: "Jul 28, 2026, 11:46 PM", text: "sleeping\neating\nwinning" },
  { id: 'g101', user: USERS.joon, time: "Jul 28, 2026, 11:50 PM", text: "Those aren't all interests." },
  { id: 'g102', user: USERS.jk, time: "Jul 28, 2026, 11:51 PM", text: "they are when you're good at them", reactions: [{emoji: "🔥", count: 4}] },
  { id: 'g103', user: USERS.tae, time: "Jul 28, 2026, 11:55 PM", text: "you forgot losing" },
  { id: 'g104', user: USERS.jk, time: "Jul 28, 2026, 11:56 PM", text: "never experienced it", reactions: [{emoji: "😎", count: 3}] },
  { id: 'g105', user: USERS.jimin, time: "Jul 28, 2026, 11:58 PM", text: "how are you doing btw" },
  { id: 'g106', user: USERS.jk, time: "Jul 28, 2026, 11:59 PM", text: "fine" },
  { id: 'g107', user: USERS.jimin, time: "Jul 29, 2026, 12:00 AM", text: "i asked because you haven't slept" },
  { id: 'g108', user: USERS.jk, time: "Jul 29, 2026, 12:01 AM", text: "i'm fine and i'm winning" },
  { id: 'g109', user: USERS.hobi, time: "Jul 29, 2026, 12:05 AM", text: "bro's health bar is flashing red", reactions: [{emoji: "🚨", count: 4}, {emoji: "🩸", count: 2}] },
  { id: 'g110', user: USERS.jk, time: "Jul 29, 2026, 12:06 AM", text: "that's just the aesthetic" },
  { id: 'g111', user: USERS.jin, time: "Jul 29, 2026, 12:15 AM", text: "drink water" },
  { id: 'g112', user: USERS.jk, time: "Jul 29, 2026, 12:16 AM", text: "drank" },
  { id: 'g113', user: USERS.joon, time: "Jul 29, 2026, 12:20 AM", text: "When?" },
  { id: 'g114', user: USERS.jk, time: "Jul 29, 2026, 12:25 AM", text: "emotionally", reactions: [{emoji: "💧", count: 5}, {emoji: "😭", count: 4}] },

  // --- AUGUST 12: PRE-PANIC PUDDING INVESTIGATION ---
  { id: 'g115', user: USERS.jin, time: "Aug 12, 2026, 07:05 PM", text: "Who ate my pudding" },
  { id: 'g116', user: USERS.jk, time: "Aug 12, 2026, 07:06 PM", text: "good evening to you too" },
  { id: 'g117', user: USERS.jin, time: "Aug 12, 2026, 07:06 PM", text: "This is a very serious question" },
  { id: 'g118', user: USERS.tae, time: "Aug 12, 2026, 07:08 PM", text: "what flavor" },
  { id: 'g119', user: USERS.jin, time: "Aug 12, 2026, 07:08 PM", text: "Chocolate" },
  { id: 'g120', user: USERS.tae, time: "Aug 12, 2026, 07:09 PM", text: "wasn't me\njust establishing that before the investigation begins", reactions: [{emoji: "🕵️", count: 2}] },
  { id: 'g121', user: USERS.hobi, time: "Aug 12, 2026, 07:10 PM", text: "hyung check the fridge before starting a criminal investigation" },
  { id: 'g122', user: USERS.jin, time: "Aug 12, 2026, 07:11 PM", text: "I CHECKED" },
  { id: 'g123', user: USERS.joon, time: "Aug 12, 2026, 07:12 PM", text: "Did you check the second shelf?" },
  { id: 'g124', user: USERS.jin, time: "Aug 12, 2026, 07:12 PM", text: "Yes" },
  { id: 'g125', user: USERS.joon, time: "Aug 12, 2026, 07:13 PM", text: "Behind the kimchi?" },
  { id: 'g126', user: USERS.jin, time: "Aug 12, 2026, 07:13 PM", text: "WHY WOULD I PUT MY PUDDING BEHIND THE KIMCHI", reactions: [{emoji: "🍲", count: 3}] },
  { id: 'g127', user: USERS.jimin, time: "Aug 12, 2026, 07:15 PM", text: "maybe it wanted privacy" },
  { id: 'g128', user: USERS.jk, time: "Aug 12, 2026, 07:16 PM", text: "pudding has more privacy than Yoongi hyung", reactions: [{emoji: "💀", count: 4}] },
  { id: 'g129', user: USERS.tae, time: "Aug 12, 2026, 07:17 PM", text: "speaking of pudding\nis yoongi hyung even alive" },
  { id: 'g130', user: USERS.hobi, time: "Aug 12, 2026, 07:18 PM", text: "LMAO" },
  { id: 'g131', user: USERS.jin, time: "Aug 12, 2026, 07:18 PM", text: "Can we focus on my pudding" },
  { id: 'g132', user: USERS.jimin, time: "Aug 12, 2026, 07:19 PM", text: "i saw him online yesterday" },
  { id: 'g133', user: USERS.joon, time: "Aug 12, 2026, 07:19 PM", text: "I think I last saw him three days ago." },
  { id: 'g134', user: USERS.tae, time: "Aug 12, 2026, 07:20 PM", text: "time is a social construct" },
  { id: 'g135', user: USERS.joon, time: "Aug 12, 2026, 07:21 PM", text: "timestamps are not" },
  { id: 'g136', user: USERS.tae, time: "Aug 12, 2026, 07:21 PM", text: "agree to disagree" },
  { id: 'g137', user: USERS.jk, time: "Aug 12, 2026, 07:22 PM", text: "Yoongi hyung operates on a different timezone" },
  { id: 'g138', user: USERS.hobi, time: "Aug 12, 2026, 07:23 PM", text: "YST\nYoongi Standard Time", reactions: [{emoji: "⏰", count: 5}] },
  { id: 'g139', user: USERS.jin, time: "Aug 12, 2026, 07:25 PM", text: "Has anyone actually talked to him lately" },
  { id: 'g140', user: USERS.jk, time: "Aug 12, 2026, 07:25 PM", text: "i sent him a video of a cat falling off a sofa" },
  { id: 'g141', user: USERS.jin, time: "Aug 12, 2026, 07:26 PM", text: "and?" },
  { id: 'g142', user: USERS.jk, time: "Aug 12, 2026, 07:26 PM", text: "he reacted 👍" },
  { id: 'g143', user: USERS.tae, time: "Aug 12, 2026, 07:27 PM", text: "wow. emotional intimacy", reactions: [{emoji: "😭", count: 4}] },
  { id: 'g144', user: USERS.jimin, time: "Aug 12, 2026, 07:28 PM", text: "sounds about right" },
  { id: 'g145', user: USERS.joon, time: "Aug 12, 2026, 07:29 PM", text: "That's more communication than most of us get from him." },
  { id: 'g146', user: USERS.hobi, time: "Aug 12, 2026, 07:30 PM", text: "he hasn't joined game night in two weeks" },
  { id: 'g147', user: USERS.jk, time: "Aug 12, 2026, 07:30 PM", text: "because you keep picking games that require teamwork" },
  { id: 'g148', user: USERS.hobi, time: "Aug 12, 2026, 07:31 PM", text: "AND?" },
  { id: 'g149', user: USERS.jk, time: "Aug 12, 2026, 07:31 PM", text: "he said watching us play is a public health concern", reactions: [{emoji: "🚑", count: 3}] },
  { id: 'g150', user: USERS.joon, time: "Aug 12, 2026, 07:32 PM", text: "I miss his gameplay judgments." },
  { id: 'g151', user: USERS.tae, time: "Aug 12, 2026, 07:33 PM", text: "i miss his judgment in general" },
  { id: 'g152', user: USERS.jin, time: "Aug 12, 2026, 07:35 PM", text: "Someone call him" },
  { id: 'g153', user: USERS.joon, time: "Aug 12, 2026, 07:35 PM", text: "I'm eating." },
  { id: 'g154', user: USERS.hobi, time: "Aug 12, 2026, 07:35 PM", text: "i'm working" },
  { id: 'g155', user: USERS.jk, time: "Aug 12, 2026, 07:36 PM", text: "i'm busy" },
  { id: 'g156', user: USERS.tae, time: "Aug 12, 2026, 07:36 PM", text: "i am communing with the dead", reactions: [{emoji: "👻", count: 2}] },
  { id: 'g157', user: USERS.jin, time: "Aug 12, 2026, 07:37 PM", text: "@Jimin" },
  { id: 'g158', user: USERS.jimin, time: "Aug 12, 2026, 07:37 PM", text: "why me" },
  { id: 'g159', user: USERS.tae, time: "Aug 12, 2026, 07:38 PM", text: "because you two are friends" },
  { id: 'g160', user: USERS.jimin, time: "Aug 12, 2026, 07:38 PM", text: "are we taking a poll" },
  { id: 'g161', user: USERS.joon, time: "Aug 12, 2026, 07:39 PM", text: "..." },
  { id: 'g162', user: USERS.hobi, time: "Aug 12, 2026, 07:39 PM", text: "anyway" },
  { id: 'g163', user: USERS.jimin, time: "Aug 12, 2026, 07:39 PM", text: "fine. I'll message him" },
  { id: 'g164', user: USERS.jin, time: "Aug 12, 2026, 07:40 PM", text: "ask if he's alive" },
  { id: 'g165', user: USERS.jk, time: "Aug 12, 2026, 07:40 PM", text: "ask if he wants to play" },
  { id: 'g166', user: USERS.tae, time: "Aug 12, 2026, 07:40 PM", text: "ask if he's achieved enlightenment" },
  { id: 'g167', user: USERS.jimin, time: "Aug 12, 2026, 07:41 PM", text: "you people are exhausting\n@Yoongi hyung are you alive" },
  { id: 'g168', user: USERS.jk, time: "Aug 12, 2026, 07:42 PM", text: "read?" },
  { id: 'g169', user: USERS.jimin, time: "Aug 12, 2026, 07:42 PM", text: "no" },
  { id: 'g170', user: USERS.hobi, time: "Aug 12, 2026, 07:43 PM", text: "call him?" },
  { id: 'g171', user: USERS.jimin, time: "Aug 12, 2026, 07:45 PM", text: "i sent him a DM and this man has the audacity to leave me on delivered", reactions: [{emoji: "📵", count: 2}] },
  { id: 'g172', user: USERS.tae, time: "Aug 12, 2026, 07:46 PM", text: "devastating" },
  { id: 'g173', user: USERS.joon, time: "Aug 12, 2026, 07:47 PM", text: "Maybe he's busy?" },
  { id: 'g174', user: USERS.jin, time: "Aug 12, 2026, 07:48 PM", text: "Can someone please find my pudding" },
  { id: 'g175', user: USERS.hobi, time: "Aug 12, 2026, 07:49 PM", text: "so game night tomorrow?" },
  { id: 'g176', user: USERS.jk, time: "Aug 12, 2026, 07:49 PM", text: "yes" },
  { id: 'g177', user: USERS.joon, time: "Aug 12, 2026, 07:50 PM", text: "Sure." },
  { id: 'g178', user: USERS.tae, time: "Aug 12, 2026, 07:50 PM", text: "only if we play something spiritually enriching" },
  { id: 'g179', user: USERS.jin, time: "Aug 12, 2026, 07:51 PM", text: "Only if someone buys me pudding" },
  { id: 'g180', user: USERS.jimin, time: "Aug 12, 2026, 07:51 PM", text: "good luck with that" },
  
  { id: 'g181', user: USERS.tae, time: "Aug 12, 2026, 08:05 PM", text: "Yoongi hyung is online", reactions: [{emoji: "👀", count: 4}] },
  { id: 'g182', user: USERS.jk, time: "Aug 12, 2026, 08:05 PM", text: "WHERE" },
  { id: 'g183', user: USERS.hobi, time: "Aug 12, 2026, 08:06 PM", text: "DISCORD?" },
  { id: 'g184', user: USERS.tae, time: "Aug 12, 2026, 08:06 PM", text: "spotify. added a song titled call me to our shared playlist." },
  { id: 'g185', user: USERS.jimin, time: "Aug 12, 2026, 08:07 PM", text: "you guys have a shared playlist?" },
  { id: 'g186', user: USERS.tae, time: "Aug 12, 2026, 08:07 PM", text: "you don’t?" },
  { id: 'g187', user: USERS.jimin, time: "Aug 12, 2026, 08:08 PM", text: "I mean yeah, I just thought…" },
  { id: 'g188', user: USERS.jin, time: "Aug 12, 2026, 08:10 PM", text: "I'M GOING TO BED" },

  // --- AUGUST 15: THE PANIC ---
  { id: 'g189', user: USERS.hobi, time: "Aug 15, 2026, 10:30 AM", text: "has anyone heard from Yoongi?" },
  { id: 'g190', user: USERS.jk, time: "Aug 15, 2026, 10:31 AM", text: "what do you mean" },
  { id: 'g191', user: USERS.hobi, time: "Aug 15, 2026, 10:31 AM", text: "I mean has anyone actually talked to him" },
  { id: 'g192', user: USERS.joon, time: "Aug 15, 2026, 10:33 AM", text: "I haven't. Why?" },
  { id: 'g193', user: USERS.hobi, time: "Aug 15, 2026, 10:33 AM", text: "I've been trying to reach him since last night" },
  { id: 'g194', user: USERS.jin, time: "Aug 15, 2026, 10:35 AM", text: "did you call?" },
  { id: 'g195', user: USERS.hobi, time: "Aug 15, 2026, 10:35 AM", text: "Yes\nstraight to voicemail" },
  { id: 'g196', user: USERS.jimin, time: "Aug 15, 2026, 10:37 AM", text: "maybe he's asleep" },
  { id: 'g197', user: USERS.hobi, time: "Aug 15, 2026, 10:37 AM", text: "I've called him six times" },
  { id: 'g198', user: USERS.jk, time: "Aug 15, 2026, 10:38 AM", text: "six?", reactions: [{emoji: "❓", count: 2}] },
  { id: 'g199', user: USERS.hobi, time: "Aug 15, 2026, 10:38 AM", text: "and messaged him" },
  { id: 'g200', user: USERS.tae, time: "Aug 15, 2026, 10:40 AM", text: "what did he say?" },
  { id: 'g201', user: USERS.hobi, time: "Aug 15, 2026, 10:40 AM", text: "nothing" },
  { id: 'g202', user: USERS.joon, time: "Aug 15, 2026, 10:42 AM", text: "When was the last time someone saw him in person?" },
  { id: 'g203', user: USERS.jk, time: "Aug 15, 2026, 10:42 AM", text: "i haven't seen him in a while" },
  { id: 'g204', user: USERS.jin, time: "Aug 15, 2026, 10:43 AM", text: "neither have I" },
  { id: 'g205', user: USERS.jimin, time: "Aug 15, 2026, 10:45 AM", text: "..." },
  { id: 'g206', user: USERS.hobi, time: "Aug 15, 2026, 10:45 AM", text: "Jimin?" },
  { id: 'g207', user: USERS.jimin, time: "Aug 15, 2026, 10:46 AM", text: "I haven't seen him" },
  { id: 'g208', user: USERS.joon, time: "Aug 15, 2026, 10:48 AM", text: "I'll try calling him." },
  { id: 'g209', user: USERS.jk, time: "Aug 15, 2026, 10:48 AM", text: "me too" },
  { id: 'g210', user: USERS.tae, time: "Aug 15, 2026, 10:50 AM", text: "his Discord is offline" },
  { id: 'g211', user: USERS.jin, time: "Aug 15, 2026, 10:51 AM", text: "maybe his phone died" },
  { id: 'g212', user: USERS.hobi, time: "Aug 15, 2026, 10:51 AM", text: "he always charges his phone" },
  { id: 'g213', user: USERS.jk, time: "Aug 15, 2026, 10:52 AM", text: "okay, but phones die" },
  { id: 'g214', user: USERS.hobi, time: "Aug 15, 2026, 10:52 AM", text: "Jungkook" },
  { id: 'g215', user: USERS.jk, time: "Aug 15, 2026, 10:52 AM", text: "i'm just saying" },
  { id: 'g216', user: USERS.joon, time: "Aug 15, 2026, 10:55 AM", text: "No answer." },
  { id: 'g217', user: USERS.hobi, time: "Aug 15, 2026, 10:55 AM", text: "so no one knows where he is?" },
  { id: 'g218', user: USERS.jk, time: "Aug 15, 2026, 10:56 AM", text: "what the hell" },
  { id: 'g219', user: USERS.tae, time: "Aug 15, 2026, 10:57 AM", text: "maybe he went somewhere without telling anyone?" },
  { id: 'g220', user: USERS.hobi, time: "Aug 15, 2026, 10:57 AM", text: "he would've told me" },
  { id: 'g221', user: USERS.joon, time: "Aug 15, 2026, 10:59 AM", text: "Hobi, when exactly did you last speak to him?" },
  { id: 'g222', user: USERS.hobi, time: "Aug 15, 2026, 10:59 AM", text: "a few days ago maybe?\neverything was normal" },
  { id: 'g223', user: USERS.jin, time: "Aug 15, 2026, 11:00 AM", text: "what about his schedule?" },
  { id: 'g224', user: USERS.joon, time: "Aug 15, 2026, 11:00 AM", text: "I'll check if I have anything from him" },
  { id: 'g225', user: USERS.jimin, time: "Aug 15, 2026, 11:02 AM", text: "did he say anything weird?" },
  { id: 'g226', user: USERS.hobi, time: "Aug 15, 2026, 11:02 AM", text: "No\nwhy?" },
  { id: 'g227', user: USERS.jimin, time: "Aug 15, 2026, 11:03 AM", text: "nothing. Just asking." },
  { id: 'g228', user: USERS.tae, time: "Aug 15, 2026, 11:05 AM", text: "guys" },
  { id: 'g229', user: USERS.joon, time: "Aug 15, 2026, 11:05 AM", text: "What?" },
  { id: 'g230', user: USERS.tae, time: "Aug 15, 2026, 11:05 AM", text: "his last online status" },
  { id: 'g231', user: USERS.jk, time: "Aug 15, 2026, 11:06 AM", text: "what about it" },
  { id: 'g232', user: USERS.tae, time: "Aug 15, 2026, 11:06 AM", text: "it's been a while" },
  { id: 'g233', user: USERS.jin, time: "Aug 15, 2026, 11:07 AM", text: "Tae, don't" },
  { id: 'g234', user: USERS.tae, time: "Aug 15, 2026, 11:07 AM", text: "I'm not saying anything" },
  { id: 'g235', user: USERS.hobi, time: "Aug 15, 2026, 11:10 AM", text: "I called him again\nnothing" },
  { id: 'g236', user: USERS.joon, time: "Aug 15, 2026, 11:11 AM", text: "Hobi, are you okay?" },
  { id: 'g237', user: USERS.hobi, time: "Aug 15, 2026, 11:11 AM", text: "No\nI'm scared", reactions: [{emoji: "💔", count: 3}] },
  { id: 'g238', user: USERS.jimin, time: "Aug 15, 2026, 11:12 AM", text: "he wouldn’t be avoiding any of us, right?" },
  { id: 'g239', user: USERS.hobi, time: "Aug 15, 2026, 11:13 AM", text: "what?\nmaybe me\nlast time we talked\ni told him not to ditch us again\nhe called me annoying\nso everything was normal" },
  { id: 'g240', user: USERS.jin, time: "Aug 15, 2026, 11:14 AM", text: "Hobi, that's okay. You couldn't have known." },
  { id: 'g241', user: USERS.hobi, time: "Aug 15, 2026, 11:15 AM", text: "no but that's the thing\ni should've called him sooner\nwe were supposed to play yesterday and i didn't even check in on him until later" },
  { id: 'g242', user: USERS.joon, time: "Aug 15, 2026, 11:16 AM", text: "You didn't know anything was wrong." },
  { id: 'g243', user: USERS.hobi, time: "Aug 15, 2026, 11:16 AM", text: "I KNOW\nI KNOW THAT\nsorry\ni'm sorry" },
  { id: 'g244', user: USERS.jk, time: "Aug 15, 2026, 11:17 AM", text: "hyung, it's okay." },
  { id: 'g245', user: USERS.hobi, time: "Aug 15, 2026, 11:18 AM", text: "it's not okay\ni've been calling him\nand every time it goes to voicemail\nwhat if his phone is dead\nwhat if he lost it\nwhat if he's hurt and we don't even know where to look" },
  { id: 'g246', user: USERS.tae, time: "Aug 15, 2026, 11:19 AM", text: "Hobi, we're going to find him." },
  { id: 'g247', user: USERS.hobi, time: "Aug 15, 2026, 11:19 AM", text: "How\nseriously how\nwe don't know where he is\nhis phone is off or dead or something\nand nobody has seen him" },
  
  // --- THE CLIMAX OF THE PANIC (AUG 15) ---
  { id: 'g248', user: USERS.jk, time: "Aug 15, 2026, 11:22 AM", text: "@everyone updating the server rules. stop using the #general chat to panic about yoongi.", reactions: [{emoji: "🛑", count: 2}] },
  { id: 'g249', user: USERS.hobi, time: "Aug 15, 2026, 11:22 AM", text: "HOW AM I SUPPOSED TO NOT PANIC WHEN HE ISN'T ANSWERING" },
  { id: 'g250', user: USERS.jin, time: "Aug 15, 2026, 11:23 AM", text: "Hobi, breathe." },
  { id: 'g251', user: USERS.hobi, time: "Aug 15, 2026, 11:23 AM", text: "I'M BREATHING\nI AM ALSO GOING INSANE" },
  { id: 'g252', user: USERS.joon, time: "Aug 15, 2026, 11:24 AM", text: "Did he have anything scheduled today?" },
  { id: 'g253', user: USERS.hobi, time: "Aug 15, 2026, 11:24 AM", text: "i don't know\ni don't know, namjoon" },
  { id: 'g254', user: USERS.jk, time: "Aug 15, 2026, 11:25 AM", text: "i know we're stressed but scrolling through 300 messages of hoseok-hyung spiraling isn't helping us actually find him." },
  { id: 'g255', user: USERS.hobi, time: "Aug 15, 2026, 11:26 AM", text: "THEN HELP ME FIND HIM" },
  { id: 'g256', user: USERS.jk, time: "Aug 15, 2026, 11:26 AM", text: "that's literally what we're doing." },
  { id: 'g257', user: USERS.jin, time: "Aug 15, 2026, 11:27 AM", text: "We're here, Hobi." },
  { id: 'g258', user: USERS.hobi, time: "Aug 15, 2026, 11:30 AM", text: "I'M ALREADY OUTSIDE" },
  { id: 'g259', user: USERS.jimin, time: "Aug 15, 2026, 11:30 AM", text: "outside where?" },
  { id: 'g260', user: USERS.hobi, time: "Aug 15, 2026, 11:31 AM", text: "HIS BUILDING" },
  { id: 'g261', user: USERS.jimin, time: "Aug 15, 2026, 11:32 AM", text: "okay, let us know what you find ASAP." },
  { id: 'g262', user: USERS.hobi, time: "Aug 15, 2026, 11:35 AM", text: "Oh fuck guys. VC NOW.", reactions: [{emoji: "📞", count: 5}, {emoji: "❗", count: 4}, {emoji: "😰", count: 5}] },

  // --- AUG 18 - SEP 1: KEEPING IT NORMAL ---
  { id: 'g262a', user: USERS.jin, time: "Aug 18, 2026, 07:02 PM", text: "I made too much japchae. Come get some." },
  { id: 'g262b', user: USERS.hobi, time: "Aug 18, 2026, 07:10 PM", text: "on my way" },
  { id: 'g262c', user: USERS.jk, time: "Aug 18, 2026, 07:11 PM", text: "save me some" },
  { id: 'g262d', user: USERS.jin, time: "Aug 18, 2026, 07:12 PM", text: "There's plenty." },
  { id: 'g262e', user: USERS.tae, time: "Aug 18, 2026, 07:30 PM", text: "did you know wombats are nocturnal" },
  { id: 'g262f', user: USERS.joon, time: "Aug 18, 2026, 07:34 PM", text: "Crepuscular, technically.", reactions: [{emoji: "🤓", count: 1}] },
  { id: 'g262g', user: USERS.tae, time: "Aug 18, 2026, 07:35 PM", text: "thank you namjoon" },

  { id: 'g262h', user: USERS.jk, time: "Aug 22, 2026, 09:00 PM", text: "game night?" },
  { id: 'g262i', user: USERS.jk, time: "Aug 22, 2026, 09:14 PM", text: "i'll be in the gaming lounge" },
  { id: 'g262j', user: USERS.hobi, time: "Aug 22, 2026, 09:52 PM", text: "sorry kook. next week" },
  { id: 'g262k', user: USERS.jk, time: "Aug 22, 2026, 09:53 PM", text: "it's fine. still winning" },

  { id: 'g262l', user: USERS.joon, time: "Aug 27, 2026, 02:47 AM", text: "Random question. Did Yoongi have a place or time zone he preferred?" },
  { id: 'g262m', user: USERS.jimin, time: "Aug 27, 2026, 02:49 AM", text: "why are you awake" },
  { id: 'g262n', user: USERS.joon, time: "Aug 27, 2026, 02:50 AM", text: "Couldn't sleep. Never mind." },
  { id: 'g262o', user: USERS.joon, time: "Aug 27, 2026, 02:51 AM", text: "Why are you awake?" },
  { id: 'g262p', user: USERS.jimin, time: "Aug 27, 2026, 02:53 AM", text: "go to sleep hyung" },

  { id: 'g262q', user: USERS.jin, time: "Sep 01, 2026, 06:15 PM", text: "I bought pudding since none of you could be bothered." },
  { id: 'g262r', user: USERS.tae, time: "Sep 01, 2026, 06:16 PM", text: "what flavor" },
  { id: 'g262s', user: USERS.jin, time: "Sep 01, 2026, 06:16 PM", text: "Chocolate. Two 4-packs, so there's one to spare." },
  { id: 'g262t', user: USERS.jin, time: "Sep 01, 2026, 06:21 PM", text: "Two to spare 😔", reactions: [{emoji: "💔", count: 4}] },
  { id: 'g262u', user: USERS.hobi, time: "Sep 01, 2026, 06:23 PM", text: "i'll take an extra" },
  { id: 'g262v', user: USERS.jk, time: "Sep 01, 2026, 06:25 PM", text: "i'll take his" },
  { id: 'g262w', user: USERS.jin, time: "Sep 01, 2026, 06:25 PM", text: "No." },
  { id: 'g262x', user: USERS.jin, time: "Sep 01, 2026, 06:26 PM", text: "Vultures." },

  // --- SEP 5 - 6: COPING QUIETLY ---
  { id: 'g263', user: USERS.hobi, time: "Sep 05, 2026, 05:48 AM", text: "went for a run by the river" },
  { id: 'g264', user: USERS.jin, time: "Sep 05, 2026, 07:15 AM", text: "At 5am?" },
  { id: 'g265', user: USERS.hobi, time: "Sep 05, 2026, 07:20 AM", text: "it was quiet" },

  { id: 'g266', user: USERS.jk, time: "Sep 05, 2026, 12:40 PM", text: "ordered too much tteokbokki" },
  { id: 'g267', user: USERS.jk, time: "Sep 05, 2026, 12:41 PM", text: "jimin-hyung you're closest" },
  { id: 'g268', user: USERS.jimin, time: "Sep 05, 2026, 01:15 PM", text: "ok" },
  { id: 'g269', user: USERS.jimin, time: "Sep 05, 2026, 01:52 PM", text: "thanks kook", reactions: [{emoji: "🫶", count: 2}] },

  { id: 'g270', user: USERS.joon, time: "Sep 05, 2026, 09:30 PM", text: "Does anyone have a printer I can borrow?" },
  { id: 'g271', user: USERS.jin, time: "Sep 05, 2026, 09:34 PM", text: "For what?" },
  { id: 'g272', user: USERS.joon, time: "Sep 05, 2026, 09:35 PM", text: "Work." },

  { id: 'g273', user: USERS.tae, time: "Sep 06, 2026, 03:12 PM", text: "someone tell me a joke" },
  { id: 'g274', user: USERS.jin, time: "Sep 06, 2026, 03:13 PM", text: "What do you call a fake noodle?" },
  { id: 'g275', user: USERS.jin, time: "Sep 06, 2026, 03:13 PM", text: "An impasta.", reactions: [{emoji: "💀", count: 1}] },

  { id: 'g276', user: USERS.jin, time: "Sep 06, 2026, 06:00 PM", text: "Dinner Sunday. My place. Everyone.", reactions: [{emoji: "✅", count: 5}] },

  // --- SEP 7 - 12 ---
  { id: 'g277', user: USERS.jk, time: "Sep 07, 2026, 09:02 PM", text: "anyone want to play tonight" },
  { id: 'g278', user: USERS.tae, time: "Sep 07, 2026, 09:40 PM", text: "i'll play" },
  { id: 'g279', user: USERS.jk, time: "Sep 07, 2026, 09:40 PM", text: "wait really" },
  { id: 'g280', user: USERS.tae, time: "Sep 07, 2026, 09:41 PM", text: "badly" },
  { id: 'g281', user: USERS.hobi, time: "Sep 09, 2026, 04:12 AM", text: "reorganized my whole closet" },
  { id: 'g282', user: USERS.jin, time: "Sep 09, 2026, 07:05 AM", text: "Anything you could get rid of?" },
  { id: 'g283', user: USERS.hobi, time: "Sep 09, 2026, 07:30 AM", text: "everything in there is vital and important" },
  { id: 'g284', user: USERS.jin, time: "Sep 10, 2026, 06:20 PM", text: "What does everyone want Sunday?" },
  { id: 'g285', user: USERS.jk, time: "Sep 10, 2026, 06:21 PM", text: "meat" },
  { id: 'g286', user: USERS.tae, time: "Sep 10, 2026, 06:25 PM", text: "the soup" },
  { id: 'g287', user: USERS.jimin, time: "Sep 10, 2026, 06:40 PM", text: "anything" },
  { id: 'g288', user: USERS.joon, time: "Sep 10, 2026, 10:58 PM", text: "Whatever's easiest. I'll be there." },
  { id: 'g289', user: USERS.jimin, time: "Sep 11, 2026, 02:14 AM", text: "anyone up" },
  { id: 'g290', user: USERS.jin, time: "Sep 11, 2026, 07:02 AM", text: "I am now. Are you okay?" },
  { id: 'g291', user: USERS.jimin, time: "Sep 11, 2026, 09:31 AM", text: "yeah. couldn't sleep" },
  { id: 'g292', user: USERS.jin, time: "Sep 12, 2026, 05:00 PM", text: "Tomorrow. 7pm. Don't make me come get you.", reactions: [{emoji: "✅", count: 5}] }
];

const WELCOME_DATA = [
  { id: 'w1', user: USERS.jk, time: "Aug 14, 2024, 10:42 PM", text: "welcome to the modern age, old men" },
  { id: 'w2', user: USERS.jk, time: "Aug 14, 2024, 10:42 PM", text: "i finally made us a private server so we can use voice channels when we game instead of putting me on speakerphone like psychopaths" },
  { id: 'w3', user: USERS.jk, time: "Aug 14, 2024, 10:43 PM", text: "i set up all the roles and channels. don't touch the settings.",
    reactions: [
      { emoji: "👍", count: 4 },
      { emoji: "🫡", count: 2 }
    ]
  },
  { id: 'w4', user: USERS.jk, time: "Aug 14, 2024, 10:43 PM", text: "@everyone if you mute this server i will come to your house and break your router. yes i am talking to you yoongi-hyung.",
    reactions: [
      { emoji: "🤡", count: 3 },
      { emoji: "🖕", count: 2 },
      { emoji: "💀", count: 5 }
    ]
  },
  { id: 'w5', user: USERS.jin, time: "Aug 15, 2024, 09:12 AM", text: "@everyone where am I supposed to go now" },
  { id: 'w6', user: USERS.jk, time: "Aug 15, 2024, 09:15 AM", text: "@jin hyung literally just click on #general it's right there on the left", reactions: [{emoji: "🤦‍♂️", count: 4}] }
];

const ANNOUNCEMENTS_DATA = [
  { id: 'a1', user: USERS.jk, time: "Oct 10, 2024, 04:15 PM", text: "@everyone reminder that we're doing the lethal company run tonight at 9." },
  { id: 'a2', user: USERS.jk, time: "Oct 10, 2024, 04:16 PM", text: "if seokjin-hyung kills me with a shovel again i am banning him from the voice channels.", reactions: [{emoji: "🪦", count: 3}] },
  { id: 'a3', user: USERS.jk, time: "Oct 10, 2024, 04:16 PM", text: "yoongi-hyung you promised you'd actually use your mic this time. don't just type in the chat when a monster is chasing you." },
  
  { id: 'a4', user: USERS.jk, time: "Mar 03, 2025, 02:14 PM", text: "@everyone whoever changed my admin nickname to 'muscle pig' is losing image perms.", reactions: [{emoji: "🐷", count: 5}, {emoji: "💪", count: 4}] },
  { id: 'a5', user: USERS.jk, time: "Mar 03, 2025, 02:15 PM", text: "i know it was either taehyung or jimin. confess." },
  
  { id: 'a6', user: USERS.jk, time: "Aug 02, 2026, 01:12 PM", text: "@everyone has anyone physically seen yoongi-hyung this week?" },
  { id: 'a7', user: USERS.jk, time: "Aug 02, 2026, 01:14 PM", text: "he hasn't logged on to steam in 6 days and he left me on read yesterday when i asked about his studio rent. i know he's deep in producing mode but someone tell him to touch grass or at least order delivery.", reactions: [{emoji: "👀", count: 2}, {emoji: "🍕", count: 1}] },
  
  { id: 'a8', user: USERS.jk, time: "Aug 09, 2026, 08:45 PM", text: "@everyone okay seriously, is yoongi-hyung ignoring all of us or just me? he missed game night again." },
  { id: 'a9', user: USERS.jk, time: "Aug 09, 2026, 08:46 PM", text: "namjoon-hyung, can you go knock on his door tomorrow? his phone is going straight to voicemail now.", reactions: [{emoji: "😰", count: 3}] },
  
  { id: 'a10', user: USERS.jk, time: "Aug 15, 2026, 11:20 AM", text: "@everyone updating the server rules. stop using the #general chat to panic about yoongi." },
  { id: 'a11', user: USERS.jk, time: "Aug 15, 2026, 11:22 AM", text: "i know we're stressed but scrolling through 300 messages of hoseok-hyung spiraling isn't helping us actually find him.", reactions: [{emoji: "💔", count: 4}] },
  
  { id: 'a12', user: USERS.jk, time: "Sep 04, 2026, 03:30 PM", text: "@everyone ok since it's been almost a month and the police are being completely useless, i added a new text channel." },
  { id: 'a13', user: USERS.jk, time: "Sep 04, 2026, 03:31 PM", text: "it's locked to just the six of us. #yoongi-where." },
  { id: 'a14', user: USERS.jk, time: "Sep 04, 2026, 03:32 PM", text: "put screenshots of your last texts with him, any weird stuff you remember from the last time you saw him, literally anything. i'm pinning a timeline to the top." }
];

const YOONGI_WHERE_DATA = [
  { id: 'yw1', user: USERS.jk, time: "Sep 04, 2026, 03:27 PM", text: "📌 **PINNED: Master Timeline & Evidence Log**\nDrop all physical clues, text screenshots, and audio files here. Do not clutter this channel with chatter. Keep it organized so we can figure out what happened.", reactions: [{emoji: "📌", count: 5}, {emoji: "🔍", count: 3}] },
  { id: 'yw2', user: USERS.hobi, time: "Sep 04, 2026, 04:30 PM", text: "okay, dropping off vc so my battery doesn't die. here’s a pic so we have evidence.", attachment: { url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEib8FnkXr__GjTmA6I0q0kjGX3aeRGFo0tJ_9vPt81Vc6UD3FYsTXCGcU24ug8paoRoctKFNzcXl7nGpK4A8zID4qS5tn6-ygXmds2Amy3EVxh7sYwRQoSRfJ3-Uwlv6-Z2kvgWiYOzRc9izOB54kTZ2dOhin0v2DGYrIdaSryfz-jXF52v-PND6sHnkeg/s1600/Screen%20Shot%202026-10-31%20at%203.50.42%20PM.png", alt: "evidence" } },
  { id: 'yw3', user: USERS.jimin, time: "Sep 04, 2026, 04:32 PM", text: "ok but what do we do next" },
  { id: 'yw4', user: USERS.jk, time: "Sep 04, 2026, 04:35 PM", text: "do you guys even read the announcements channel? we've tried the police and they've been less than helpful. it's time that each and every one of us gets it together and posts here when where how and why we last saw him. LET'S GO." },

  // --- SEP 4 EVENING: EVERYONE'S LAST CONTACT ---
  // 1. Jungkook
  { id: 'yw5', user: USERS.jk, time: "Sep 04, 2026, 04:41 PM", text: "fine. i'll go first" },
  { id: 'yw6', user: USERS.jk, time: "Sep 04, 2026, 04:42 PM", text: "", attachment: { url: "/round%203%20yoongi%20jungkook%20text.png", alt: "texts with Yoongi" } },
  { id: 'yw7', user: USERS.jk, time: "Sep 04, 2026, 04:42 PM", text: "read it. nothing." },
  { id: 'yw8', user: USERS.jk, time: "Sep 04, 2026, 04:44 PM", text: "", attachment: { url: "/round%203%20yoongi%20jungkook%20discord.png", alt: "Discord DM with Yoongi" } },
  { id: 'yw9', user: USERS.jk, time: "Sep 04, 2026, 04:45 PM", text: "look at the time on the reaction" },
  { id: 'yw10', user: USERS.jk, time: "Sep 04, 2026, 04:45 PM", text: "his phone was already going to voicemail on the 9th" },
  { id: 'yw11', user: USERS.jin, time: "Sep 04, 2026, 04:46 PM", text: "So his phone was on." },
  { id: 'yw12', user: USERS.jk, time: "Sep 04, 2026, 04:46 PM", text: "for like a minute. at 3am." },
  { id: 'yw13', user: USERS.jk, time: "Sep 04, 2026, 04:48 PM", text: "also i called his landlord" },
  { id: 'yw14', user: USERS.jk, time: "Sep 04, 2026, 04:48 PM", text: "rent's paid through december" },
  { id: 'yw15', user: USERS.tae, time: "Sep 04, 2026, 04:49 PM", text: "december" },
  { id: 'yw16', user: USERS.jin, time: "Sep 04, 2026, 04:49 PM", text: "That's four months." },

  // 2. Jin
  { id: 'yw17', user: USERS.jin, time: "Sep 04, 2026, 05:03 PM", text: "I don't know if this counts.", attachment: { url: "/round%203%20yoongi%20seokjin%20money%20transaction.png", alt: "bank transfer" } },
  { id: 'yw18', user: USERS.jin, time: "Sep 04, 2026, 05:04 PM", text: "He's never let me pay for anything in his life." },
  { id: 'yw19', user: USERS.hobi, time: "Sep 04, 2026, 05:05 PM", text: "wait the chicken from the han river??" },
  { id: 'yw20', user: USERS.jin, time: "Sep 04, 2026, 05:05 PM", text: "The chicken from the Han River." },
  { id: 'yw21', user: USERS.jk, time: "Sep 04, 2026, 05:06 PM", text: "why would he pay that back now" },
  { id: 'yw22', user: USERS.jin, time: "Sep 04, 2026, 05:08 PM", text: "I don't know. It was the one time he forgot his wallet, right after a whole speech about being his own boss. I teased him for years. I thought he never paid me back because he liked the bit as much as I did." },

  // 3. Hoseok
  { id: 'yw23', user: USERS.hobi, time: "Sep 04, 2026, 06:58 PM", text: "ok i'm charged" },
  { id: 'yw24', user: USERS.hobi, time: "Sep 04, 2026, 06:59 PM", text: "", attachment: { url: "/round%203%20yoongi%20hoseok%20text.png", alt: "texts with Yoongi" } },
  { id: 'yw25', user: USERS.hobi, time: "Sep 04, 2026, 07:01 PM", text: "i said a few days" },
  { id: 'yw26', user: USERS.hobi, time: "Sep 04, 2026, 07:01 PM", text: "it was july 30" },
  { id: 'yw27', user: USERS.hobi, time: "Sep 04, 2026, 07:02 PM", text: "he tried to talk to me and i told him to go to sleep" },
  { id: 'yw28', user: USERS.jin, time: "Sep 04, 2026, 07:03 PM", text: "Hobi." },
  { id: 'yw29', user: USERS.hobi, time: "Sep 04, 2026, 07:03 PM", text: "😞" },

  // 4. Namjoon
  { id: 'yw30', user: USERS.jk, time: "Sep 04, 2026, 07:10 PM", text: "namjoon-hyung?" },
  { id: 'yw31', user: USERS.joon, time: "Sep 04, 2026, 07:14 PM", text: "Here's our last text. I'm still going through some things. Do you guys know a 5 or 6 digit number that would have been important to Yoongi-hyung?", attachment: { url: "/round%203%20yoongi%20namjoon%20text.png", alt: "texts with Yoongi" } },
  { id: 'yw32', user: USERS.jk, time: "Sep 04, 2026, 07:14 PM", text: "going through what" },
  { id: 'yw33', user: USERS.jin, time: "Sep 04, 2026, 07:15 PM", text: "Like a code?" },
  { id: 'yw34', user: USERS.hobi, time: "Sep 04, 2026, 07:15 PM", text: "for what?" },
  { id: 'yw35', user: USERS.jk, time: "Sep 04, 2026, 07:16 PM", text: "wait. aug 9 at 11:42pm?" },
  { id: 'yw36', user: USERS.jk, time: "Sep 04, 2026, 07:16 PM", text: "that's the night i asked you to go knock on his door. his phone was already going to voicemail" },
  { id: 'yw37', user: USERS.joon, time: "Sep 04, 2026, 07:17 PM", text: "I know." },
  { id: 'yw38', user: USERS.joon, time: "Sep 04, 2026, 07:17 PM", text: "Nothing now. I'll post when I have something." },

  // 5. Taehyung
  { id: 'yw39', user: USERS.jk, time: "Sep 04, 2026, 07:18 PM", text: "tae" },
  { id: 'yw40', user: USERS.tae, time: "Sep 04, 2026, 07:20 PM", text: "nothing since the playlist" },
  { id: 'yw41', user: USERS.jk, time: "Sep 04, 2026, 07:20 PM", text: "what about before that" },
  { id: 'yw42', user: USERS.tae, time: "Sep 04, 2026, 07:22 PM", text: "our last texts were from before he went missing. if we want to talk it's usually through songs." },
  { id: 'yw43', user: USERS.jk, time: "Sep 04, 2026, 07:22 PM", text: "and the last song was from him and it was called \"call me\"? did you try to call him?" },
  { id: 'yw44', user: USERS.tae, time: "Sep 04, 2026, 07:23 PM", text: "what? no. i added that song for him. he was supposed to call me." },
  { id: 'yw45', user: USERS.jk, time: "Sep 04, 2026, 07:23 PM", text: "you said he added it!" },
  { id: 'yw46', user: USERS.tae, time: "Sep 04, 2026, 07:23 PM", text: "no i didn't. hold on." },
  { id: 'yw47', user: USERS.tae, time: "Sep 04, 2026, 07:24 PM", text: "okay. i just looked at the chat. i can see how you thought that. no, it was from me and he never called.", reactions: [{emoji: "💔", count: 4}] },

  // 6. Jimin
  { id: 'yw48', user: USERS.jk, time: "Sep 04, 2026, 07:25 PM", text: "namjoon-hyung at least posted something. jimin you haven't said anything. he was supposed to bring you food on june 28. did he?" },
  { id: 'yw49', user: USERS.jimin, time: "Sep 04, 2026, 07:31 PM", text: "yes" },
  { id: 'yw50', user: USERS.jk, time: "Sep 04, 2026, 07:31 PM", text: "and?" },
  { id: 'yw51', user: USERS.jimin, time: "Sep 04, 2026, 07:34 PM", text: "", attachment: { url: "/round%203%20yoongi%20jimin%20text.png", alt: "texts with Yoongi" } },
  { id: 'yw52', user: USERS.jk, time: "Sep 04, 2026, 07:35 PM", text: "what's above that" },
  { id: 'yw53', user: USERS.jimin, time: "Sep 04, 2026, 07:35 PM", text: "nothing important" },
  { id: 'yw54', user: USERS.jk, time: "Sep 04, 2026, 07:35 PM", text: "jimin" },
  { id: 'yw55', user: USERS.jimin, time: "Sep 04, 2026, 07:36 PM", text: "i said it's nothing. he said something that worried me though." },
  { id: 'yw56', user: USERS.jk, time: "Sep 04, 2026, 07:37 PM", text: "what was it?" },
  { id: 'yw57', user: USERS.jimin, time: "Sep 04, 2026, 07:40 PM", text: "we had a fight before he left my place that night. he said he didn't deserve to be there, but he had found a way that he thought maybe he could." },
  { id: 'yw58', user: USERS.hobi, time: "Sep 04, 2026, 07:41 PM", text: "found a way to what" },
  { id: 'yw59', user: USERS.joon, time: "Sep 04, 2026, 07:41 PM", text: "Did he say where?" },
  { id: 'yw60', user: USERS.jk, time: "Sep 04, 2026, 07:42 PM", text: "deserve to be there? what?" },
  { id: 'yw61', user: USERS.jimin, time: "Sep 04, 2026, 07:45 PM", text: "i told him of course he did. he'd been so good to me, to all of us. but he just shook his head and said it all made him so tired." },
  { id: 'yw62', user: USERS.jk, time: "Sep 04, 2026, 07:46 PM", text: "what aren't you telling us?" },
  { id: 'yw63', user: USERS.jimin, time: "Sep 04, 2026, 07:46 PM", text: "i just told you everything. can you stop?" },
  { id: 'yw64', user: USERS.jk, time: "Sep 04, 2026, 07:47 PM", text: "it doesn't sound like everything." },
  { id: 'yw65', user: USERS.jin, time: "Sep 04, 2026, 07:47 PM", text: "That's enough. Jimin, come over for a little bit, okay?" },
  { id: 'yw66', user: USERS.jimin, time: "Sep 04, 2026, 07:49 PM", text: "yeah, ok. i'll see you soon." },

  // --- SEP 13: NAMJOON'S CONFESSION + THE PASSWORD ---
  { id: 'yw67', user: USERS.joon, time: "Sep 13, 2026, 10:42 PM", text: "Ok so I lied." },
  { id: 'yw68', user: USERS.joon, time: "Sep 13, 2026, 10:42 PM", text: "Most of you heard some of this at dinner. I'm sorry. I wanted to protect his privacy." },
  { id: 'yw69', user: USERS.joon, time: "Sep 13, 2026, 10:44 PM", text: "On Aug 9, he video-called me around 11:25 at night. Wherever he is, the wi-fi must be spotty. He asked me to log into his email and check if something had come through." },
  { id: 'yw70', user: USERS.joon, time: "Sep 13, 2026, 10:45 PM", text: "He read me the password while I typed." },
  { id: 'yw71', user: USERS.jk, time: "Sep 13, 2026, 10:45 PM", text: "check what" },
  { id: 'yw72', user: USERS.joon, time: "Sep 13, 2026, 10:46 PM", text: "A payment confirmation from his landlord. He seemed relieved." },
  { id: 'yw73', user: USERS.joon, time: "Sep 13, 2026, 10:47 PM", text: "I asked where he was. He said somewhere quiet, and asked how we were all doing." },
  { id: 'yw74', user: USERS.joon, time: "Sep 13, 2026, 10:48 PM", text: "There was a wooden wall behind him. And someone off camera said \"It's time, Yoongi.\" He said okay and hung up." },
  { id: 'yw75', user: USERS.jimin, time: "Sep 13, 2026, 10:49 PM", text: "who the fuck\nyou know what. nevermind" },
  { id: 'yw76', user: USERS.joon, time: "Sep 13, 2026, 10:49 PM", text: "I don't know." },
  { id: 'yw77', user: USERS.joon, time: "Sep 13, 2026, 10:51 PM", text: "He texted me thanks a few minutes later. That's the screenshot." },
  { id: 'yw78', user: USERS.joon, time: "Sep 13, 2026, 10:52 PM", text: "Kook asked me to knock on his door the next day. I didn't, because I'd just seen him and he looked fine. He looked rested. I've been trying to get back into his email since." },
  { id: 'yw79', user: USERS.hobi, time: "Sep 13, 2026, 10:53 PM", text: "which is why you've been asking weird questions, right?" },
  { id: 'yw80', user: USERS.joon, time: "Sep 13, 2026, 10:54 PM", text: "Yes. I can't remember the password and I need help." },
  { id: 'yw81', user: USERS.jin, time: "Sep 13, 2026, 10:55 PM", text: "Namjoon. That's his private email." },
  { id: 'yw82', user: USERS.tae, time: "Sep 13, 2026, 10:56 PM", text: "i'd rather he be mad at us" },
  { id: 'yw83', user: USERS.hobi, time: "Sep 13, 2026, 10:56 PM", text: "if it was one of us he'd already be in" },
  { id: 'yw84', user: USERS.jk, time: "Sep 13, 2026, 10:56 PM", text: "i'm in" },
  { id: 'yw85', user: USERS.jin, time: "Sep 13, 2026, 10:58 PM", text: "If we do this, whatever's in there stays between us." },
  { id: 'yw86', user: USERS.jimin, time: "Sep 13, 2026, 11:01 PM", text: "do it" },
  { id: 'yw87', user: USERS.joon, time: "Sep 13, 2026, 11:02 PM", text: "Here's what I remember." },
  { id: 'yw88', user: USERS.joon, time: "Sep 13, 2026, 11:02 PM", text: "It started with one word. Usually it's two, but he typed it as one." },
  { id: 'yw89', user: USERS.joon, time: "Sep 13, 2026, 11:03 PM", text: "I can't remember the word, but the MIN in it was in capitals. Maybe the beginning letter was capitalized too." },
  { id: 'yw90', user: USERS.joon, time: "Sep 13, 2026, 11:03 PM", text: "Then something like a time zone, all caps." },
  { id: 'yw91', user: USERS.joon, time: "Sep 13, 2026, 11:04 PM", text: "Then six numbers. He said them fast." },
  { id: 'yw92', user: USERS.jk, time: "Sep 13, 2026, 11:04 PM", text: "and you don't remember them" },
  { id: 'yw93', user: USERS.joon, time: "Sep 13, 2026, 11:05 PM", text: "If I did, we wouldn't be having this conversation." },
  { id: 'yw94', user: USERS.joon, time: "Sep 13, 2026, 11:07 PM", text: "I set up the login. If anyone wants to try.", link: 'mail' },
  { id: 'yw95', user: USERS.joon, time: "Sep 13, 2026, 11:07 PM", text: "Maybe one of you can." }
];

// Last-read marker: the red NEW line appears right after this message, and the channel opens there.
// To move it later, change the id. Channels not listed open at the bottom as usual.
const LAST_READ = { general: 'g276', 'yoongi-where': 'yw66' };


// --- YOONGI'S MAIL (password puzzle) ---
// The inbox below is encrypted. Only the correct password can unlock it,
// so neither the password nor the emails can be read from this code.
const SEALED_MAIL = {"salt":"tf/yLK0WUEl7yemRGpefoQ==","iv":"f1XrFDJkuSz7gWWf","data":"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"};
const MAIL_ACCOUNT = 'defnotyoongi@gmail.com';
const MAIL_LAST_SIGN_IN = 'Aug 9, 2026, 11:31 PM';
const MAIL_STORAGE_KEY = 'eq_mail_unlock';

const b64ToBytes = (b64) => Uint8Array.from(atob(b64), c => c.charCodeAt(0));

async function unsealMail(password) {
  const enc = new TextEncoder();
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64ToBytes(SEALED_MAIL.salt), iterations: 250000, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
  );
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64ToBytes(SEALED_MAIL.iv) }, key, b64ToBytes(SEALED_MAIL.data));
  return JSON.parse(new TextDecoder().decode(plain));
}

function MailClient({ onClose }) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | wrong
  const [mail, setMail] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [showCommons, setShowCommons] = useState(false);
  const [readIds, setReadIds] = useState([]);

  // Remember a reader who already solved it (per browser only).
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem(MAIL_STORAGE_KEY); } catch (e) {}
    if (saved) unsealMail(saved).then(setMail).catch(() => {});
  }, []);

  const tryPassword = async (e) => {
    e.preventDefault();
    const guess = password.trim();
    if (!guess) return;
    setStatus('checking');
    try {
      const data = await unsealMail(guess);
      try { localStorage.setItem(MAIL_STORAGE_KEY, guess); } catch (err) {}
      setMail(data);
      setStatus('idle');
    } catch (err) {
      setStatus('wrong');
    }
  };

  const openEmail = mail && mail.emails.find(m => m.id === openId);

  return (
    <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center sm:p-4" onClick={onClose}>
      <div
        className="bg-white text-[#1f1f1f] w-full h-full sm:h-[85vh] sm:max-w-3xl sm:rounded-xl overflow-hidden flex flex-col shadow-2xl"
        style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 h-14 border-b border-gray-200 flex-shrink-0">
          {(openEmail || showCommons) ? (
            <button onClick={() => { if (showCommons) setShowCommons(false); else setOpenId(null); }} className="p-1 -ml-1 text-gray-600 hover:text-black"><ArrowLeft size={22} /></button>
          ) : (
            <Mail size={22} className="text-[#c5221f]" />
          )}
          <span className="font-medium text-[18px] text-gray-700">{showCommons ? 'The Commons' : 'Mail'}</span>
          {mail && !openEmail && !showCommons && (
            <div className="hidden sm:flex items-center gap-2 bg-[#eaf1fb] rounded-full px-4 h-10 flex-1 max-w-sm ml-4 text-gray-500 text-sm"><Search size={16} /> Search mail</div>
          )}
          <button onClick={onClose} className="ml-auto p-1 text-gray-500 hover:text-black"><X size={22} /></button>
        </div>

        {/* LOCKED */}
        {!mail && (
          <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 bg-[#f6f8fc]">
            <form onSubmit={tryPassword} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <div className="flex justify-center mb-4"><div className="w-14 h-14 rounded-full bg-[#eaf1fb] flex items-center justify-center"><Lock size={24} className="text-[#0b57d0]" /></div></div>
              <h2 className="text-center text-2xl font-normal mb-1">Welcome</h2>
              <div className="flex justify-center mb-6">
                <span className="text-sm border border-gray-300 rounded-full px-3 py-1 text-gray-700">{MAIL_ACCOUNT}</span>
              </div>
              <label className="block text-xs text-gray-600 mb-1">Enter your password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); if (status === 'wrong') setStatus('idle'); }}
                autoCapitalize="off" autoCorrect="off" spellCheck="false" autoComplete="off"
                className={`w-full border rounded-md px-3 py-3 text-base outline-none focus:border-[#0b57d0] focus:ring-1 focus:ring-[#0b57d0] ${status === 'wrong' ? 'border-[#d93025]' : 'border-gray-300'}`}
              />
              <div className="h-6 mt-1 text-sm text-[#d93025]">{status === 'wrong' ? 'Incorrect password.' : ''}</div>
              <button type="submit" disabled={status === 'checking'} className="w-full bg-[#0b57d0] hover:bg-[#0a4ab5] disabled:opacity-60 text-white rounded-full py-2.5 font-medium mt-1">
                {status === 'checking' ? 'Checking…' : 'Next'}
              </button>
              <div className="text-center text-xs text-gray-400 mt-6">Last sign-in: {MAIL_LAST_SIGN_IN}</div>
            </form>
          </div>
        )}

        {/* INBOX */}
        {mail && !openEmail && !showCommons && (
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">Inbox · {mail.emails.filter(m => m.unread && !readIds.includes(m.id)).length} unread</div>
            {mail.emails.map(m => {
              const unread = m.unread && !readIds.includes(m.id);
              return (
                <button key={m.id} onClick={() => { setOpenId(m.id); setReadIds(r => r.includes(m.id) ? r : [...r, m.id]); }}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:shadow-sm ${unread ? 'bg-white' : 'bg-[#f2f6fc]'}`}>
                  <div className="w-9 h-9 rounded-full bg-[#5f6368] text-white flex items-center justify-center text-sm flex-shrink-0">{m.from[0]}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className={`truncate text-[15px] ${unread ? 'font-bold text-black' : 'text-gray-700'}`}>{m.from}</span>
                      <span className={`ml-auto text-xs flex-shrink-0 ${unread ? 'font-bold text-black' : 'text-gray-500'}`}>{m.date}</span>
                    </div>
                    <div className={`truncate text-sm ${unread ? 'font-bold text-black' : 'text-gray-700'}`}>{m.subject}</div>
                    <div className="truncate text-sm text-gray-500">{m.body[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* OPEN EMAIL */}
        {mail && openEmail && !showCommons && (
          <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
            <h1 className="text-[22px] sm:text-[26px] font-normal mb-5">{openEmail.subject}</h1>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white flex items-center justify-center flex-shrink-0">{openEmail.from[0]}</div>
              <div className="min-w-0 text-sm">
                <div>
                  <span className="font-bold">{openEmail.from}</span>
                  {openEmail.via ? (
                    <span className="text-gray-500"> · <button onClick={() => setShowCommons(true)} className="text-[#0b57d0] hover:underline">{openEmail.via}</button></span>
                  ) : (
                    <span className="text-gray-500"> &lt;{openEmail.address}&gt;</span>
                  )}
                </div>
                <div className="text-gray-500">to me · {openEmail.full}</div>
              </div>
            </div>
            <div className="text-[15px] leading-7 space-y-4 whitespace-pre-line">
              {openEmail.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        )}

        {/* THE COMMONS PAGE */}
        {mail && showCommons && (
          <div className="flex-1 overflow-y-auto bg-[#f7f5f0] flex items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <div className="text-[11px] tracking-[0.25em] uppercase text-[#8a8170] mb-3">{mail.commons.subtitle}</div>
              <div className="text-4xl sm:text-5xl text-[#2b2a27] mb-6" style={{ fontFamily: 'Georgia, serif' }}>{mail.commons.title}</div>
              <div className="w-12 h-px bg-[#c9c1b1] mx-auto mb-6" />
              <p className="text-[#55504a] italic mb-10" style={{ fontFamily: 'Georgia, serif' }}>{mail.commons.line}</p>
              <p className="text-sm text-[#8a8170]">{mail.commons.note}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [activeModal, setActiveModal] = useState(null);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const [isTextChannelsCategoryOpen, setIsTextChannelsCategoryOpen] = useState(true);
  const [isVoiceChannelsCategoryOpen, setIsVoiceChannelsCategoryOpen] = useState(true);
  const chatEndRef = useRef(null);
  const lastReadRef = useRef(null);

  // Auto-scroll to bottom when changing channels
  const channelOpenedAt = useRef(0);
  const scrollToStart = () => {
    if (LAST_READ[activeChannel] && lastReadRef.current) {
      lastReadRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    } else {
      chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  };
  useEffect(() => {
    channelOpenedAt.current = Date.now();
    scrollToStart();
  }, [activeChannel]);
  // Screenshots load after the jump and push the NEW line down, so re-aim
  // when an image finishes loading in the first couple of seconds.
  const handleImageLoaded = () => {
    if (Date.now() - channelOpenedAt.current < 2500) scrollToStart();
  };

  const currentDisplayData = activeChannel === 'general' ? GENERAL_DATA 
                           : activeChannel === 'welcome' ? WELCOME_DATA 
                           : activeChannel === 'announcements' ? ANNOUNCEMENTS_DATA 
                           : activeChannel === 'yoongi-where' ? YOONGI_WHERE_DATA
                           : [];

  return (
    <>
      <style>{`
        /* Custom scrollbar for webkit to mimic Discord */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #2f3136; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #202225; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #18191c; }
        
        /* Message entry animation */
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-animate { animation: slideIn 0.3s ease forwards; }
      `}</style>

      <div className="flex h-screen w-full bg-[#36393f] text-[#dcddde] font-sans overflow-hidden selection:bg-indigo-500/30 text-[16px]">
        
        {/* FAR-LEFT SIDEBAR (Server Icons) - Always Visible */}
        <div className="flex flex-col w-[72px] bg-[#202225] py-3 items-center gap-3 flex-shrink-0 z-40">
          <img 
            src="https://i.redd.it/ow8uqp6vbnpd1.jpeg"
            alt="DO NOT MUTE Server"
            className="w-12 h-12 rounded-[24px] hover:rounded-xl transition-all cursor-pointer object-cover"
          />
          <div className="w-8 h-[2px] bg-gray-700 rounded-full my-1"></div>
        </div>

        {/* LEFT SIDEBAR (Channels) - Collapsible */}
        {isChannelsOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/60 z-30"
            onClick={() => setIsChannelsOpen(false)}
          ></div>
        )}
        <div className={`
          fixed md:relative inset-y-0 left-[72px] md:left-0 z-30 bg-[#2f3136] flex flex-col transition-all duration-300 flex-shrink-0 overflow-hidden
          ${isChannelsOpen ? 'w-60' : 'w-0'}
        `}>
          <div className="w-60 flex flex-col h-full">
            {/* Server Header with Hamburger Toggle */}
            <div className="h-12 flex items-center justify-between px-4 border-b border-gray-900/20 shadow-sm flex-shrink-0 hover:bg-[#393c43] transition-colors">
              <span className="font-bold text-white truncate shadow-sm">DO NOT MUTE</span>
              <button 
                className="p-1 -mr-1 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsChannelsOpen(false)}
                title="Collapse Channels"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              {/* TEXT CHANNELS */}
              <div 
                className="flex items-center text-[12px] font-bold text-[#8e9297] uppercase tracking-wider mb-2 -ml-1 cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => setIsTextChannelsCategoryOpen(!isTextChannelsCategoryOpen)}
              >
                {isTextChannelsCategoryOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
                Text Channels
              </div>
              
              {isTextChannelsCategoryOpen && (
                <div className="flex flex-col gap-1 mb-6">
                  <div 
                    onClick={() => setActiveChannel('welcome')}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${activeChannel === 'welcome' ? 'bg-[#393c43] text-white' : 'hover:bg-[#393c43] text-gray-400'}`}
                  >
                    <Hash size={18} /> welcome
                  </div>
                  <div 
                    onClick={() => setActiveChannel('announcements')}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${activeChannel === 'announcements' ? 'bg-[#393c43] text-white' : 'hover:bg-[#393c43] text-gray-400'}`}
                  >
                    <Hash size={18} /> announcements
                  </div>
                  <div 
                    onClick={() => setActiveChannel('general')}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${activeChannel === 'general' ? 'bg-[#393c43] text-white' : 'hover:bg-[#393c43] text-gray-400'}`}
                  >
                    <Hash size={18} /> general
                  </div>
                  <div 
                    onClick={() => setActiveChannel('yoongi-where')}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${activeChannel === 'yoongi-where' ? 'bg-[#393c43] text-white' : 'hover:bg-[#393c43] text-gray-400'}`}
                  >
                    <Hash size={18} /> yoongi-where
                  </div>
                </div>
              )}

              {/* VOICE CHANNELS */}
              <div 
                className="flex items-center text-[12px] font-bold text-[#8e9297] uppercase tracking-wider mb-2 -ml-1 cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => setIsVoiceChannelsCategoryOpen(!isVoiceChannelsCategoryOpen)}
              >
                {isVoiceChannelsCategoryOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
                Voice Channels
              </div>

              {isVoiceChannelsCategoryOpen && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors hover:bg-[#393c43] text-gray-400">
                    <Volume2 size={18} /> Gaming Lounge
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors hover:bg-[#393c43] text-gray-400">
                    <Volume2 size={18} /> AFK
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CHAT AREA */}
        <div className="flex-1 flex flex-col min-w-0 relative bg-[#36393f] z-10">
          
         {/* HEADER */}
          <div className="h-14 md:h-12 pt-4 md:pt-0 flex items-center justify-between px-4 border-b border-gray-900/20 shadow-sm flex-shrink-0">
            <div className="flex items-center gap-3 font-bold text-white">
              {!isChannelsOpen && (
                <button 
                  className="p-1.5 -ml-1 text-[#b9bbbe] hover:text-white hover:bg-gray-700/50 rounded transition-all flex items-center justify-center flex-shrink-0 relative z-50"
                  onClick={() => setIsChannelsOpen(true)}
                  title="Expand Channels"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              )}
              <Hash size={20} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{activeChannel}</span>
            </div>
            
            <button 
              className="p-1 text-gray-400 hover:text-gray-200 transition-colors"
              onClick={() => setIsMembersOpen(!isMembersOpen)}
            >
              <Users size={24} />
            </button>
          </div>

          {/* CHAT HISTORY */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 flex flex-col gap-6">
            
            {/* Banners */}
            {activeChannel === 'general' && (
              <div className="mt-4 mb-4 border-l-4 border-indigo-500 pl-4 msg-animate">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to #general!</h1>
                <p className="text-gray-400">This is the start of the secure server. Ensure all encryptions are active before transmitting.</p>
              </div>
            )}
            
            {activeChannel === 'welcome' && (
              <div className="mt-4 mb-4 border-l-4 border-indigo-500 pl-4 msg-animate">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to #welcome!</h1>
                <p className="text-gray-400">This is the start of the DO NOT MUTE server.</p>
              </div>
            )}

            {activeChannel === 'announcements' && (
              <div className="mt-4 mb-4 border-l-4 border-indigo-500 pl-4 msg-animate">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to #announcements!</h1>
                <p className="text-gray-400">Server updates, rules, and game night scheduling.</p>
              </div>
            )}

            {activeChannel === 'yoongi-where' && (
              <div className="mt-4 mb-4 border-l-4 border-red-500 pl-4 msg-animate">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to #yoongi-where!</h1>
                <p className="text-gray-400">Restricted channel. Drop all evidence, screenshots, and timelines regarding Min Yoongi's disappearance here.</p>
              </div>
            )}

            <div className="w-full h-[1px] bg-gray-700/50 my-2"></div>

            {/* Messages */}
            {currentDisplayData.map((msg, i, arr) => {
              const isGrouped = i > 0 && arr[i - 1].user.name === msg.user.name && arr[i - 1].time === msg.time;
              
              return (
                <React.Fragment key={msg.id}>
                <div className={`flex gap-4 hover:bg-black/10 py-1 px-2 -mx-2 rounded msg-animate ${isGrouped ? 'mt-[-20px]' : ''}`}>
                  
                  {/* Avatar or Timestamp */}
                  <div className="w-10 flex-shrink-0 flex justify-center mt-1">
                    {!isGrouped ? (
                      <img 
                        src={msg.user.avatar} 
                        alt={msg.user.name} 
                        className="w-10 h-10 rounded-full object-cover bg-gray-700"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-500 opacity-0 hover:opacity-100 mt-2">{msg.time.split(', ')[1] || msg.time}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col w-full min-w-0">
                    {!isGrouped && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className={`font-medium ${msg.user.color} hover:underline cursor-pointer`}>{msg.user.name}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                    )}
                    
                    <div className="text-[#dcddde] text-[16px] leading-relaxed break-words whitespace-pre-wrap">
                      {msg.text}
                    </div>

                    {/* Link card (opens Yoongi's mail) */}
                    {msg.link === 'mail' && (
                      <button
                        onClick={() => setIsMailOpen(true)}
                        className="mt-2 w-fit max-w-[320px] text-left bg-[#2f3136] border-l-4 border-[#0b57d0] rounded px-4 py-3 hover:bg-[#34373c] transition-colors"
                      >
                        <div className="text-[#00aff4] font-semibold hover:underline">Mail · Sign in</div>
                        <div className="text-[#b9bbbe] text-sm mt-1">defnotyoongi@gmail.com</div>
                        <div className="text-[#72767d] text-xs mt-2 flex items-center gap-1"><Lock size={12} /> Password required</div>
                      </button>
                    )}

                    {/* Emojis/Reactions */}
                    {msg.reactions && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.reactions.map((reaction, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-1.5 bg-[#2f3136] hover:bg-[#393c43] border border-[#202225] hover:border-gray-600 rounded px-2 py-0.5 text-sm cursor-pointer transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-gray-400 font-medium">{reaction.count}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Attachments */}
                    {msg.attachment && (
                      <div 
                        onClick={() => setActiveModal(msg.attachment)}
                        className="mt-3 w-fit rounded cursor-pointer group relative border border-[#202225] overflow-hidden"
                      >
                        <img src={msg.attachment.url} onLoad={handleImageLoaded} alt={msg.attachment.alt || "clue"} className="block w-auto h-auto max-w-[260px] max-h-96 opacity-90 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-black/75 text-white font-bold py-2 px-4 rounded text-sm">View File</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {LAST_READ[activeChannel] === msg.id && (
                  <div ref={lastReadRef} className="relative flex items-center -my-2">
                    <div className="flex-1 h-px bg-[#f23f43]"></div>
                    <span className="ml-1 bg-[#f23f43] text-white text-[10px] font-bold uppercase rounded px-1 leading-4">New</span>
                  </div>
                )}
                </React.Fragment>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* RIGHT SIDEBAR (Members) - Collapsible */}
        {isMembersOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/60 z-30"
            onClick={() => setIsMembersOpen(false)}
          ></div>
        )}
        
        <div className={`
          fixed md:relative inset-y-0 right-0 z-30 bg-[#2f3136] flex flex-col transition-all duration-300 flex-shrink-0 overflow-hidden
          ${isMembersOpen ? 'w-64 translate-x-0' : 'w-0 translate-x-full md:translate-x-0 md:w-0'}
        `}>
          <div className="w-64 p-4 overflow-y-auto custom-scrollbar h-full">
            <div className="md:hidden flex justify-end mb-4">
              <button onClick={() => setIsMembersOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <h2 className="text-[12px] font-bold text-[#8e9297] uppercase tracking-wider mb-2 px-2">Online — 6</h2>
            
            {Object.values(USERS).filter(u => u.status === 'online').map(user => (
              <div key={user.name} className="flex items-center gap-3 p-2 hover:bg-[#393c43] rounded cursor-pointer group transition-colors">
                <div className="relative flex-shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#3ba55d] border-[2.5px] border-[#2f3136] rounded-full group-hover:border-[#393c43] transition-colors"></div>
                </div>
                <span className={`text-[#dcddde] text-[15px] font-medium ${user.color}`}>{user.name}</span>
              </div>
            ))}

            <h2 className="text-[12px] font-bold text-[#8e9297] uppercase tracking-wider mt-6 mb-2 px-2">Offline — 1</h2>
            
            {Object.values(USERS).filter(u => u.status === 'offline').map(user => (
              <div key={user.name} className="flex items-center gap-3 p-2 hover:bg-[#393c43] rounded cursor-pointer opacity-40 grayscale transition-colors">
                <div className="relative flex-shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                </div>
                <span className="text-[#8e9297] text-[15px] font-medium">{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* YOONGI'S MAIL */}
        {isMailOpen && <MailClient onClose={() => setIsMailOpen(false)} />}

        {/* MODAL / CLUE VIEWER */}
        {activeModal && (
          <div 
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-[100] p-4 cursor-zoom-out animate-in fade-in duration-200"
            onClick={() => setActiveModal(null)}
          >
            <div className="max-w-4xl max-h-screen relative p-2" onClick={e => e.stopPropagation()}>
              <button 
                className="absolute -top-10 right-0 text-gray-400 hover:text-white flex items-center gap-2"
                onClick={() => setActiveModal(null)}
              >
                <X size={20} /> Close
              </button>
              
              <img src={activeModal.url} alt="Expanded Evidence" className="max-w-full max-h-[85vh] rounded object-contain shadow-2xl" />
            </div>
          </div>
        )}

      </div>
    </>
  );
}