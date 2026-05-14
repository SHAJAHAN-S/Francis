export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: 'Study Tips' | 'Parenting' | 'School Life' | 'Career Guidance' | 'Resources';
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Effective Study Techniques for Board Exam Success',
    slug: 'study-techniques-board-exams',
    date: '2026-04-28',
    author: 'Mrs. Mary Stella, Principal',
    category: 'Study Tips',
    excerpt: 'Proven strategies to help students prepare effectively for Tamil Nadu State Board examinations and achieve centum marks.',
    content: `Board examinations are a significant milestone in every student's academic journey. At St. Francis, we have consistently achieved a 98% pass rate, and here are the study techniques our top performers swear by.\n\n1. **Create a Study Schedule**: Allocate specific time blocks for each subject. Prioritize weaker subjects during your peak concentration hours.\n\n2. **Active Recall**: Instead of re-reading notes, close your book and try to recall the key points. This strengthens memory pathways.\n\n3. **Practice Previous Year Papers**: This is the single most effective strategy. It familiarizes you with the exam pattern and time management.\n\n4. **Teach What You Learn**: Explaining concepts to a friend or family member reinforces your understanding.\n\n5. **Use Mind Maps**: Visual summaries of chapters help in quick revision before exams.\n\n6. **Take Regular Breaks**: The Pomodoro Technique (25 min study, 5 min break) prevents burnout.\n\n7. **Stay Healthy**: Good sleep, nutritious food, and some physical activity are crucial for optimal brain function.\n\n8. **Group Study Sessions**: Discussing difficult topics with classmates can offer new perspectives.\n\n9. **Digital Resources**: Use educational apps and videos for complex concepts in Science and Math.\n\n10. **Stay Positive**: A positive mindset and self-belief are as important as preparation. You've got this!`,
    tags: ['exams', 'study tips', 'board exams', 'Class X'],
  },
  {
    id: 2,
    title: 'How to Support Your Child\'s Learning at Home',
    slug: 'support-child-learning-at-home',
    date: '2026-04-15',
    author: 'Mr. Rajesh Kumar, Vice Principal',
    category: 'Parenting',
    excerpt: 'Practical tips for parents to create a supportive learning environment and foster academic growth outside the classroom.',
    content: `Education doesn't end at the school gate. Parents play a vital role in shaping their child's academic success and overall development.\n\n**Create a Dedicated Study Space**: A quiet, well-lit corner with minimal distractions helps children focus better.\n\n**Establish a Routine**: Consistent study hours help build discipline. Include time for homework, revision, and leisure.\n\n**Show Interest, Not Pressure**: Ask about what they learned today rather than demanding high marks. Curiosity beats pressure every time.\n\n**Read Together**: Reading aloud or discussing books builds vocabulary and comprehension skills that benefit all subjects.\n\n**Limit Screen Time**: While technology is helpful for learning, excessive screen time can be counterproductive. Set clear boundaries.\n\n**Encourage Questions**: Never dismiss a child's questions. A curious child becomes a lifelong learner.\n\n**Attend Parent-Teacher Meetings**: Regular communication with teachers gives you insights into your child's progress and areas for improvement.\n\n**Celebrate Effort, Not Just Results**: Praising hard work rather than just marks builds resilience and a growth mindset.`,
    tags: ['parenting', 'home learning', 'study habits'],
  },
  {
    id: 3,
    title: 'Career Guidance: Choosing the Right Stream After Class X',
    slug: 'career-guidance-after-class-x',
    date: '2026-03-30',
    author: 'Mrs. Lakshmi Priya, Career Counselor',
    category: 'Career Guidance',
    excerpt: 'A comprehensive guide to help students and parents make informed decisions about academic streams and career paths.',
    content: `Choosing between Science, Commerce, and Arts after Class X is one of the first major career decisions a student makes. Here's how to make it wisely.\n\n**Science Stream**: Ideal for students passionate about Medicine, Engineering, Research, or Technology. Requires strong aptitude in Mathematics and Science.\n\n**Commerce Stream**: Perfect for those interested in Business, Finance, Accounting, Economics, or Entrepreneurship. Offers diverse career options.\n\n**Arts/Humanities Stream**: Excellent for students drawn to Law, Journalism, Psychology, Sociology, or Civil Services. Often underestimated but incredibly rewarding.\n\n**Key Factors to Consider**:\n- Interest and aptitude (not just parental preference)\n- Future career goals\n- Academic strengths\n- Market demand and job prospects\n\n**Remember**: No stream is superior to another. The best choice is the one that aligns with your child's genuine interests and abilities.\n\nAt St. Francis, our career guidance cell conducts individual counseling sessions to help every student make an informed decision.`,
    tags: ['career guidance', 'Class X', 'streams', 'higher secondary'],
  },
  {
    id: 4,
    title: 'The Importance of Extracurricular Activities in Child Development',
    slug: 'importance-extracurricular-activities',
    date: '2026-03-15',
    author: 'Mr. Senthil Murugan, PE Department',
    category: 'School Life',
    excerpt: 'Why sports, arts, and clubs are just as important as textbooks for your child\'s holistic development.',
    content: `At St. Francis, we believe education extends far beyond textbooks. Our 15+ extracurricular clubs and sports programs are designed to develop well-rounded individuals.\n\n**Physical Development**: Sports build strength, coordination, and healthy habits that last a lifetime.\n\n**Social Skills**: Team activities teach cooperation, communication, and conflict resolution.\n\n**Leadership**: Student council, scout programs, and club leadership roles develop confidence and responsibility.\n\n**Stress Relief**: Creative activities like music, art, and dance provide healthy outlets for emotional expression.\n\n**Academic Benefits**: Research shows that students who participate in extracurriculars often perform better academically due to improved time management and motivation.\n\n**Character Building**: Winning and losing in sports teaches resilience, sportsmanship, and humility.\n\nEncourage your child to explore different activities. You never know where hidden talents lie!`,
    tags: ['extracurricular', 'sports', 'clubs', 'development'],
  },
  {
    id: 5,
    title: 'Free Downloadable Worksheets: Mathematics Practice for Classes VI-X',
    slug: 'math-worksheets-download',
    date: '2026-02-28',
    author: 'Mr. Arjun Prasad, Mathematics Dept.',
    category: 'Resources',
    excerpt: 'Practice worksheets covering key mathematical concepts aligned with Tamil Nadu State Board syllabus.',
    content: `We are pleased to share a curated set of Mathematics practice worksheets for students of Classes VI through X.\n\n**What's Included**:\n- Number Systems and Operations\n- Algebra and Equations\n- Geometry and Mensuration\n- Statistics and Probability\n- Trigonometry (Class IX-X)\n\n**How to Use**:\n1. Download the worksheets for your class\n2. Attempt all problems without looking at solutions\n3. Check your answers with the answer key\n4. Mark the areas where you need improvement\n5. Revisit those topics in your textbook\n\nThese worksheets are designed to supplement classroom learning and are aligned with the Tamil Nadu State Board curriculum.\n\nNote: Worksheets will be updated quarterly with new problem sets. Keep checking this page for the latest versions.`,
    tags: ['mathematics', 'worksheets', 'download', 'practice'],
  },
];
