import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { CheckCircle, ArrowRight } from "lucide-react";

const lessons = [
  {
    id: 'intro',
    title: 'Introduction to File Handling',
    description: 'Learn the basics of file handling in Java',
    content: `
      <h3>What is File Handling?</h3>
      <p>File handling is the process of reading from and writing to files on a computer system.</p>
      <p>In Java, file handling operations are performed using classes in the <code>java.io</code> package.</p>
      
      <h3>Why is File Handling Important?</h3>
      <ul>
        <li>Saving application data for future use</li>
        <li>Reading configuration settings</li>
        <li>Storing user preferences</li>
        <li>Logging information for debugging</li>
      </ul>
    `
  },
  {
    id: 'file-classes',
    title: 'File Classes in Java',
    description: 'Explore important file classes in Java',
    content: `
      <h3>Core File Classes</h3>
      <p>Java provides several classes for file operations:</p>
      <ul>
        <li><code>File</code>: Represents a file or directory path</li>
        <li><code>FileInputStream</code>/<code>FileOutputStream</code>: Read/write binary data</li>
        <li><code>FileReader</code>/<code>FileWriter</code>: Read/write character data</li>
        <li><code>BufferedReader</code>/<code>BufferedWriter</code>: Improved performance with buffering</li>
      </ul>
    `
  },
  {
    id: 'reading',
    title: 'Reading from Files',
    description: 'Learn how to read data from files',
    content: `
      <h3>Reading Text Files</h3>
      <pre><code>
try (BufferedReader reader = new BufferedReader(new FileReader("scores.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
      </code></pre>
      <p>This code opens a file named "scores.txt" and reads it line by line.</p>
    `
  },
  {
    id: 'writing',
    title: 'Writing to Files',
    description: 'Learn how to write data to files',
    content: `
      <h3>Writing Text Files</h3>
      <pre><code>
try (BufferedWriter writer = new BufferedWriter(new FileWriter("scores.txt"))) {
    writer.write("Player1,100");
    writer.newLine();
    writer.write("Player2,85");
} catch (IOException e) {
    e.printStackTrace();
}
      </code></pre>
      <p>This code writes player scores to a file named "scores.txt".</p>
    `
  }
];

const FileHandlingGame = ({ onCompleteLesson }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });

  const markAsComplete = () => {
    const lesson = lessons[currentLessonIndex];
    if (!completedLessons.includes(lesson.id)) {
      const newCompleted = [...completedLessons, lesson.id];
      setCompletedLessons(newCompleted);
      localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
      onCompleteLesson(newCompleted.length);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

   const currentLesson = lessons[currentLessonIndex];
  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="flex justify-center items-center h-full pt-24">
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Learn Java File Handling</h1>
        <p className="text-muted-foreground">Master the basics of file operations in Java</p>
        <div className="mt-4 flex items-center gap-2">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-sm text-muted-foreground">{completedLessons.length}/{lessons.length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
              <CardDescription>Work through each lesson in order</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lessons.map((lesson, index) => (
                  <li key={lesson.id}>
                    <Button 
                      variant={currentLessonIndex === index ? "default" : "ghost"}
                      className={`w-full justify-start ${completedLessons.includes(lesson.id) ? 'text-primary' : ''}`}
                      onClick={() => setCurrentLessonIndex(index)}
                    >
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      )}
                      {lesson.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>{currentLesson.title}</CardTitle>
              <CardDescription>{currentLesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none" 
                dangerouslySetInnerHTML={{ __html: currentLesson.content }}
              />
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                  disabled={currentLessonIndex === 0}
                >
                  Previous
                </Button>
                
                <div className="space-x-2">
                  <Button
                    variant={completedLessons.includes(currentLesson.id) ? "outline" : "default"}
                    onClick={markAsComplete}
                  >
                    {completedLessons.includes(currentLesson.id) ? 'Completed' : 'Mark as Complete'}
                  </Button>

                  
                  <Button
                    variant="default"
                    className="gap-2"
                    onClick={goToNextLesson}
                    disabled={currentLessonIndex === lessons.length - 1}
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FileHandlingGame;
