---
title: Create a Pyramid in CSharp
tags:
  - CSharp
  - examples
  - coding
---


```cs
using System;
					
public class Program
{
	public static void Main()
	{
        Console.Write("Enter the number of rows for the pyramid: ");
        int numRows = int.Parse(Console.ReadLine());

        for (int i = 1; i <= numRows; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                Console.Write(i);
            }
            Console.WriteLine();
        }
	}
}
```

```bash
Enter the number of rows for the pyramid: **5**  
1  
22  
333  
4444  
55555
```
