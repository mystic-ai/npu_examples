import os
import npu

npu.api(os.environ["API_TOKEN"], deployed=True)

input_article = '''President Donald Trump's physician, Navy Cmdr Dr. Sean Conley, held a second medical briefing that again raised more questions 
than answers about the President's condition.In another jarring news conference on Sunday, Trump's doctors said that even 
though the President has had at least two concerning drops in oxygen levels, they are hoping he could be discharged as early as
tomorrow from Walter Reed National Military Medical Center.Conley and other doctors involved in the President's care offered 
some more information about the President's condition -- but there were still significant gaps that made it hard to decipher
the full picture.Conley failed to answer basic questions about the President's condition and admitted that he had omitted 
those alarming drops in the President's oxygen levels during a news conference Saturday because he wanted to "reflect the upbeat 
attitude" that the team and the President had about his condition and didn't want "to give any information that might steer the 
course of illness in another direction."Conley acknowledged that his evasive answers "came off that we were trying to hide 
something" but said that "wasn't necessarily true," adding that the President is "doing really well" and is responding to treatment.
During the briefing Sunday, Conley acknowledged that the President has experienced "two episodes of transient drops in his oxygen 
saturation" and said the team debated the reasons for that and whether to intervene. He said the President was given supplemental oxygen and has also been treated with the steroid dexamethasone, and his current blood oxygen level is 98%.
But Conley refused to say how low the President's blood oxygen levels had dropped. When asked if they had dropped below 90, 
he replied, "We don't have any recordings here of that." Pressed again on whether they had dropped below 90, Conley said 
the President's blood oxygen levels didn't get down into "the low 80s."
He offered no detail about what X-rays or CT scans have shown about whether there has been any damage to the President's lungs.
"There's some expected findings, but nothing of any major clinical concern," Conley said, not explaining whether they were 
expected findings in a normal patient or a Covid-19 patient.
Some seven months into a pandemic that has killed more than 209,000 Americans, the nation is now facing a 
grave governing crisis with its commander in chief hospitalized -- his condition hinging on his progress over 
the coming days -- as the White House events of the past week serve as a textbook example of how not to handle a deadly virus'''

print(npu.predict("60a50d0fbcfe327d47f4127a", [[input_article]]))
