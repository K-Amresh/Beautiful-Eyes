import { Component, ReactiveClass } from '@beautiful-eyes/core';
import template from './backstory.template.be';

@Component({
    selector: 'Backstory',
    useTemplate: template,
    useStyleSheets: []
})
export class Backstory extends ReactiveClass {
    lede = `Beautiful Eyes is named after someone. This is how a framework started with a girl, a boy, and a lot of badly written code.`;

    chapters = [
        {
            year: '2014',
            title: 'How this started',
            paragraphs: [
                `I fell in love with a girl. I wanted to give her something like what Shah Jahan built for Mumtaz -- the Taj Mahal, basically. I was sixteen. That was not happening. So I did the only thing I could. I was just starting to learn coding, and she became the reason I kept going.`,
                `She was beautiful in a way that was hard to look away from and easy to underestimate if you only saw her once. Dark, calm eyes. A face that stayed with you. She never acted like she knew that. What got me even more was how she was as a person -- warm, patient, the kind of girl who actually listened, who made ordinary days feel like they were enough. She laughed easily. She was kind without making a show of it. I still think about that.`,
            ],
        },
        {
            year: 'Learning to code',
            title: 'Her name in my programs',
            paragraphs: [
                `I used her name everywhere. console.log, just to see it print. Function names. Class names. Whenever I was trying to understand something new, I would name it after her so I would remember it. It sounds a bit silly now. At the time it felt serious. I could not build her a monument, but I could make every small program I wrote have her in it.`,
            ],
        },
        {
            year: 'Then we started talking',
            title: 'Twelve hours a day',
            paragraphs: [
                `Then one day we actually started talking. After that it was twelve hours a day, day and night. Exams, future, all of that could wait. For us that stretch of time was the whole thing -- not a phase, not a side story. It was everything we wanted, and we were already in it.`,
                `I remember her voice late at night when the house had gone quiet, and how a random conversation could last until morning and still not feel long enough. We were not planning a life. We were just there, and that was enough.`,
            ],
        },
        {
            year: 'Board exams',
            title: 'The year I locked the door',
            paragraphs: [
                `Then board exams showed up, and the real world came back. She went to college. I thought I should take one more year and try for a better entrance exam, a better college -- something that would make me feel like I had more to offer. I cut off almost everyone, locked myself in my room, and studied twelve to twenty-three hours a day.`,
                `I was not trying to leave her behind. I thought if I came back with a better result, I would be closer to the kind of life I wanted to give her. It did not work out that way. I did not make it into the college I was aiming for. I went to a good one I could get into, and I told myself I would figure out the rest from there.`,
            ],
        },
        {
            year: 'College',
            title: 'Talking again',
            paragraphs: [
                `A year later we were both in college. She was in second year, I was in first, and we started talking again. It felt easy, like the year apart had not really turned us into strangers.`,
                `By then I had gotten pretty good at coding. I started taking internships so I could save money and gift her something nice someday. That was the point of the extra work -- not to disappear. Some days the internship ran late and I took too long to reply. I thought she would get it, because I was doing it for her. Looking back, I can see how that sounds from the other side. She was patient with me anyway.`,
            ],
        },
        {
            year: 'Covid',
            title: 'I chose the future and lost the present',
            paragraphs: [
                `Then covid happened, and suddenly there was time. I thought, okay, let me build my future first. More study, more internships, head down. I told myself I would come back when I had something to show. What I actually did was let three years of us go quiet.`,
                `When I finally tried to talk to her again, she was honest. She said she used to like me. Not anymore. She was not cruel about it. She did not have to be. I had not given her priority when it mattered, and she had moved on. That was fair.`,
            ],
        },
        {
            year: 'After',
            title: 'What I would tell myself now',
            paragraphs: [
                `I still do not think I had a lot of clean options. For a boy like me it felt like career or this -- study, internships, money, a future -- or stay in the moment and hope it all works out later. I picked the first one because I thought that was how you become someone worth staying for. I was wrong about the timing. She never asked me to build her a Taj Mahal. She just needed me to be there.`,
                `I am not proud of how I handled it. I also cannot pretend I did it out of not caring. I cared a lot. I just showed it in the worst possible way -- by going quiet and calling it a plan.`,
            ],
        },
    ];

    closing = {
        title: 'Wherever you are',
        paragraphs: [
            `This is in her memory, because she is the reason I learned to code. I named this framework Beautiful Eyes after her. Wherever you are -- be happy.`,
        ],
    };
}
